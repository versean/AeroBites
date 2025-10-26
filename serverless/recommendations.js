const AWS = require('aws-sdk');

// Configure AWS
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_DEFAULT_REGION
});

const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  try {
    const { preferences, dietaryRestrictions, budget, location } = JSON.parse(event.body);
    
    // Get user's order history for personalized recommendations
    const orderHistory = await getUserOrderHistory(event.userId || 'anonymous');
    
    // Generate AI-powered recommendations
    const recommendations = await generateRecommendations({
      preferences,
      dietaryRestrictions,
      budget,
      location,
      orderHistory
    });
    
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify({
        recommendations: recommendations,
        personalized: true,
        timestamp: new Date().toISOString()
      })
    };
    
  } catch (error) {
    console.error('Recommendations Error:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        error: 'Failed to generate recommendations',
        details: error.message
      })
    };
  }
};

async function generateRecommendations(params) {
  const { preferences, dietaryRestrictions, budget, location, orderHistory } = params;
  
  // AI-powered recommendation logic
  const recommendations = [];
  
  // Popular items based on location
  const locationPopular = getLocationPopularItems(location);
  
  // Dietary-friendly options
  const dietaryOptions = getDietaryOptions(dietaryRestrictions);
  
  // Budget-appropriate items
  const budgetItems = getBudgetItems(budget);
  
  // Personalized based on order history
  const personalizedItems = getPersonalizedItems(orderHistory);
  
  // Combine and rank recommendations
  const allItems = [...locationPopular, ...dietaryOptions, ...budgetItems, ...personalizedItems];
  const rankedItems = rankRecommendations(allItems, preferences);
  
  return {
    top_recommendations: rankedItems.slice(0, 5),
    dietary_suggestions: dietaryOptions.slice(0, 3),
    budget_options: budgetItems.slice(0, 3),
    personalized_picks: personalizedItems.slice(0, 3),
    reasoning: generateRecommendationReasoning(rankedItems, preferences)
  };
}

function getLocationPopularItems(location) {
  const locationMenus = {
    'Cowell College': ['Chicken Tenders', 'Pizza', 'Salad Bar', 'Pasta Station'],
    'Stevenson College': ['Burger Bar', 'Stir Fry', 'Sandwich Station', 'Soup'],
    'Crown College': ['Sushi', 'Tacos', 'Grilled Chicken', 'Veggie Bowl'],
    'Merrill College': ['Pizza', 'Pasta', 'Salad', 'Dessert Bar'],
    'Porter College': ['Burrito Bar', 'Asian Cuisine', 'Salad', 'Fries'],
    'Kresge College': ['Sushi', 'Stir Fry', 'Sandwich', 'Soup'],
    'Oakes College': ['Tacos', 'Burrito', 'Salad', 'Grilled Items'],
    'Rachel Carson College': ['Pizza', 'Pasta', 'Salad', 'Dessert'],
    'College Nine': ['Asian Cuisine', 'Stir Fry', 'Sushi', 'Salad'],
    'College Ten': ['Burger Bar', 'Pizza', 'Salad', 'Soup'],
    'John R. Lewis College': ['Tacos', 'Burrito', 'Salad', 'Grilled Chicken']
  };
  
  return locationMenus[location] || ['Pizza', 'Salad', 'Sandwich', 'Soup'];
}

function getDietaryOptions(restrictions) {
  const dietaryMenus = {
    'Vegetarian': ['Veggie Burger', 'Garden Salad', 'Pasta Primavera', 'Veggie Wrap'],
    'Vegan': ['Veggie Bowl', 'Fruit Salad', 'Vegan Sandwich', 'Smoothie'],
    'Gluten-Free': ['Grilled Chicken', 'Salad', 'Rice Bowl', 'Fruit'],
    'Dairy-Free': ['Veggie Bowl', 'Fruit Salad', 'Grilled Chicken', 'Rice'],
    'Nut-Free': ['Chicken Tenders', 'Pizza', 'Pasta', 'Salad'],
    'Halal': ['Grilled Chicken', 'Rice Bowl', 'Salad', 'Fruit'],
    'Kosher': ['Grilled Chicken', 'Salad', 'Rice', 'Fruit']
  };
  
  return restrictions.map(restriction => dietaryMenus[restriction] || []).flat();
}

function getBudgetItems(budget) {
  const budgetMenus = {
    'budget': ['Pizza Slice', 'Salad', 'Soup', 'Fries', 'Sandwich'],
    'moderate': ['Burger', 'Pasta', 'Stir Fry', 'Tacos', 'Burrito'],
    'premium': ['Sushi', 'Grilled Salmon', 'Steak', 'Lobster Roll', 'Premium Salad']
  };
  
  return budgetMenus[budget] || budgetMenus['moderate'];
}

function getPersonalizedItems(orderHistory) {
  // Analyze order history to find patterns
  const itemFrequency = {};
  orderHistory.forEach(order => {
    order.items.forEach(item => {
      itemFrequency[item.name] = (itemFrequency[item.name] || 0) + 1;
    });
  });
  
  // Return most frequently ordered items
  return Object.entries(itemFrequency)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
    .map(([item]) => item);
}

function rankRecommendations(items, preferences) {
  // Simple ranking algorithm - can be enhanced with ML
  const scores = {};
  
  items.forEach(item => {
    scores[item] = 0;
    
    // Preference matching
    if (preferences.includes(item.toLowerCase())) {
      scores[item] += 10;
    }
    
    // Popularity boost
    if (['Pizza', 'Burger', 'Salad', 'Chicken Tenders'].includes(item)) {
      scores[item] += 5;
    }
  });
  
  return Object.entries(scores)
    .sort(([,a], [,b]) => b - a)
    .map(([item]) => item);
}

function generateRecommendationReasoning(items, preferences) {
  const topItems = items.slice(0, 3);
  return `Based on your preferences for ${preferences.join(', ')}, I recommend ${topItems.join(', ')}. These items are popular at your location and match your taste preferences.`;
}

async function getUserOrderHistory(userId) {
  try {
    const params = {
      TableName: process.env.ORDERS_TABLE || 'ucsc-food-orders',
      IndexName: 'user-email-index',
      KeyConditionExpression: 'user_email = :email',
      ExpressionAttributeValues: {
        ':email': userId
      },
      Limit: 10
    };
    
    const result = await dynamodb.query(params).promise();
    return result.Items || [];
  } catch (error) {
    console.error('Error getting order history:', error);
    return [];
  }
}
