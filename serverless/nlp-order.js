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
    const { naturalLanguageText, userId, sessionId } = JSON.parse(event.body);
    
    // Parse natural language order
    const parsedOrder = await parseNaturalLanguageOrder(naturalLanguageText);
    
    // Validate and enhance the order
    const validatedOrder = await validateOrder(parsedOrder);
    
    // Create cart items
    const cartItems = await createCartItems(validatedOrder);
    
    // Save to user's cart
    await saveToCart(userId, cartItems);
    
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify({
        success: true,
        parsedOrder: validatedOrder,
        cartItems: cartItems,
        message: `Added ${cartItems.length} items to your cart!`,
        timestamp: new Date().toISOString()
      })
    };
    
  } catch (error) {
    console.error('NLP Order Error:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        error: 'Failed to process natural language order',
        details: error.message
      })
    };
  }
};

async function parseNaturalLanguageOrder(text) {
  // Simple NLP parsing - can be enhanced with Amazon Comprehend
  const order = {
    items: [],
    location: null,
    dietary_restrictions: [],
    preferences: []
  };
  
  // Extract items from natural language
  const itemPatterns = [
    /(?:I want|I'd like|get me|order|add)\s+([^,]+?)(?:\s+from|\s+at|\s+in|$)/gi,
    /(?:a|an|some)\s+([^,]+?)(?:\s+and|\s+with|$)/gi,
    /([^,]+?)(?:\s+please|\s+thanks|$)/gi
  ];
  
  itemPatterns.forEach(pattern => {
    const matches = text.match(pattern);
    if (matches) {
      matches.forEach(match => {
        const item = match.replace(/(?:I want|I'd like|get me|order|add|a|an|some|please|thanks)/gi, '').trim();
        if (item && item.length > 2) {
          order.items.push(item);
        }
      });
    }
  });
  
  // Extract location
  const locationPatterns = [
    /from\s+([^,]+)/gi,
    /at\s+([^,]+)/gi,
    /in\s+([^,]+)/gi
  ];
  
  locationPatterns.forEach(pattern => {
    const match = text.match(pattern);
    if (match) {
      order.location = match[1].trim();
    }
  });
  
  // Extract dietary restrictions
  const dietaryKeywords = ['vegetarian', 'vegan', 'gluten-free', 'dairy-free', 'nut-free', 'halal', 'kosher'];
  dietaryKeywords.forEach(keyword => {
    if (text.toLowerCase().includes(keyword)) {
      order.dietary_restrictions.push(keyword);
    }
  });
  
  // Extract preferences
  const preferenceKeywords = ['spicy', 'mild', 'hot', 'cold', 'fresh', 'healthy', 'cheap', 'expensive'];
  preferenceKeywords.forEach(keyword => {
    if (text.toLowerCase().includes(keyword)) {
      order.preferences.push(keyword);
    }
  });
  
  return order;
}

async function validateOrder(parsedOrder) {
  const validatedOrder = {
    items: [],
    location: parsedOrder.location || 'Cowell College Dining Hall',
    dietary_restrictions: parsedOrder.dietary_restrictions,
    preferences: parsedOrder.preferences
  };
  
  // Validate and map items to actual menu items
  for (const item of parsedOrder.items) {
    const mappedItem = await mapToMenuItem(item, validatedOrder.dietary_restrictions);
    if (mappedItem) {
      validatedOrder.items.push(mappedItem);
    }
  }
  
  return validatedOrder;
}

async function mapToMenuItem(itemText, dietaryRestrictions) {
  // Menu item mapping - can be enhanced with ML
  const menuMappings = {
    'burger': { name: 'Burger', price: 8.99, category: 'main' },
    'pizza': { name: 'Pizza Slice', price: 3.99, category: 'main' },
    'salad': { name: 'Garden Salad', price: 6.99, category: 'healthy' },
    'pasta': { name: 'Pasta', price: 7.99, category: 'main' },
    'chicken': { name: 'Grilled Chicken', price: 9.99, category: 'main' },
    'soup': { name: 'Soup of the Day', price: 4.99, category: 'soup' },
    'sandwich': { name: 'Sandwich', price: 6.99, category: 'main' },
    'tacos': { name: 'Tacos', price: 7.99, category: 'main' },
    'burrito': { name: 'Burrito', price: 8.99, category: 'main' },
    'sushi': { name: 'Sushi Roll', price: 12.99, category: 'premium' },
    'fries': { name: 'French Fries', price: 3.99, category: 'side' },
    'drink': { name: 'Beverage', price: 2.99, category: 'beverage' }
  };
  
  // Find best match
  const itemLower = itemText.toLowerCase();
  for (const [key, item] of Object.entries(menuMappings)) {
    if (itemLower.includes(key)) {
      // Apply dietary restrictions
      if (dietaryRestrictions.includes('vegetarian') && !isVegetarian(item)) {
        continue;
      }
      if (dietaryRestrictions.includes('vegan') && !isVegan(item)) {
        continue;
      }
      if (dietaryRestrictions.includes('gluten-free') && !isGlutenFree(item)) {
        continue;
      }
      
      return {
        ...item,
        quantity: 1,
        dietary_notes: dietaryRestrictions.length > 0 ? dietaryRestrictions.join(', ') : null
      };
    }
  }
  
  // Default fallback
  return {
    name: itemText,
    price: 6.99,
    category: 'main',
    quantity: 1,
    dietary_notes: dietaryRestrictions.length > 0 ? dietaryRestrictions.join(', ') : null
  };
}

function isVegetarian(item) {
  const vegetarianItems = ['salad', 'pasta', 'soup', 'sandwich', 'tacos', 'burrito'];
  return vegetarianItems.some(veg => item.name.toLowerCase().includes(veg));
}

function isVegan(item) {
  const veganItems = ['salad', 'soup'];
  return veganItems.some(veg => item.name.toLowerCase().includes(veg));
}

function isGlutenFree(item) {
  const glutenFreeItems = ['salad', 'soup', 'grilled chicken'];
  return glutenFreeItems.some(gf => item.name.toLowerCase().includes(gf));
}

async function createCartItems(validatedOrder) {
  const cartItems = validatedOrder.items.map(item => ({
    id: `item_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    name: item.name,
    price: item.price,
    quantity: item.quantity || 1,
    category: item.category,
    dietary_notes: item.dietary_notes,
    dining_location_name: validatedOrder.location,
    added_at: new Date().toISOString()
  }));
  
  return cartItems;
}

async function saveToCart(userId, cartItems) {
  try {
    // This would integrate with your existing cart system
    // For now, we'll just log the items
    console.log(`Saving ${cartItems.length} items to cart for user ${userId}`);
    
    // In a real implementation, you'd save to your cart storage
    // await dynamodb.put({
    //   TableName: 'user-carts',
    //   Item: {
    //     userId: userId,
    //     items: cartItems,
    //     updated_at: new Date().toISOString()
    //   }
    // }).promise();
    
    return true;
  } catch (error) {
    console.error('Error saving to cart:', error);
    throw error;
  }
}
