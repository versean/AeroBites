const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

const DINING_LOCATIONS_TABLE = process.env.DINING_LOCATIONS_TABLE;
const MENU_ITEMS_TABLE = process.env.MENU_ITEMS_TABLE;

// Sample data from the original base44Client.js
const diningLocationsData = [
  {
    id: '1',
    name: 'Cowell/Stevenson Dining Hall',
    type: 'dining_hall',
    description: 'Main dining hall serving breakfast, lunch, and dinner',
    image_url: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=800',
    hours: '7:00 AM - 9:00 PM',
    location: 'Cowell/Stevenson',
    is_open: true,
    supports_drone: true
  },
  {
    id: '2',
    name: 'Crown/Merrill Dining Hall',
    type: 'dining_hall',
    description: 'Modern dining facility with diverse menu options',
    image_url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
    hours: '7:00 AM - 9:00 PM',
    location: 'Crown/Merrill',
    is_open: true,
    supports_drone: true
  },
  {
    id: '3',
    name: 'Porter/Kresge Dining Hall',
    type: 'dining_hall',
    description: 'Sustainable dining with organic options',
    image_url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800',
    hours: '7:00 AM - 9:00 PM',
    location: 'Porter/Kresge',
    is_open: true,
    supports_drone: true
  },
  {
    id: '4',
    name: 'College Nine/Ten Dining Hall',
    type: 'dining_hall',
    description: 'International cuisine and themed nights',
    image_url: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800',
    hours: '7:00 AM - 9:00 PM',
    location: 'College Nine/Ten',
    is_open: true,
    supports_drone: true
  },
  {
    id: '5',
    name: 'Oakes Cafe',
    type: 'cafe',
    description: 'Coffee, pastries, and light meals',
    image_url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800',
    hours: '6:00 AM - 8:00 PM',
    location: 'Oakes College',
    is_open: true,
    supports_drone: false
  },
  {
    id: '6',
    name: 'Rachel Carson Coffee House',
    type: 'cafe',
    description: 'Student-run coffee shop with organic options',
    image_url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800',
    hours: '7:00 AM - 10:00 PM',
    location: 'Rachel Carson College',
    is_open: true,
    supports_drone: false
  },
  {
    id: '7',
    name: 'McHenry Library Cafe',
    type: 'cafe',
    description: 'Study-friendly cafe with coffee and light snacks',
    image_url: 'https://images.unsplash.com/photo-1481833761820-0509d3217039?w=800',
    hours: '8:00 AM - 11:00 PM',
    location: 'McHenry Library',
    is_open: true,
    supports_drone: false
  },
  {
    id: '8',
    name: 'Science & Engineering Library Cafe',
    type: 'cafe',
    description: 'Tech-focused cafe with energy drinks and quick bites',
    image_url: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800',
    hours: '7:00 AM - 12:00 AM',
    location: 'Science & Engineering Library',
    is_open: true,
    supports_drone: false
  },
  {
    id: '9',
    name: 'Quarry Plaza Market',
    type: 'market',
    description: 'Convenience store with snacks, drinks, and essentials',
    image_url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
    hours: '6:00 AM - 10:00 PM',
    location: 'Quarry Plaza',
    is_open: true,
    supports_drone: true
  },
  {
    id: '10',
    name: 'Bay Tree Bookstore Cafe',
    type: 'cafe',
    description: 'Campus bookstore cafe with coffee and pastries',
    image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
    hours: '8:00 AM - 6:00 PM',
    location: 'Bay Tree Bookstore',
    is_open: true,
    supports_drone: false
  }
];

const menuItemsData = [
  // Cowell/Stevenson Dining Hall
  {
    id: '1',
    dining_location_id: '1',
    name: 'Classic Breakfast Burrito',
    description: 'Scrambled eggs, bacon, cheese, and hash browns wrapped in a tortilla',
    price: 7.99,
    category: 'breakfast',
    meal_period: ['breakfast'],
    image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400',
    dietary_info: [],
    is_available: true,
    calories: 520
  },
  {
    id: '2',
    dining_location_id: '1',
    name: 'Grilled Chicken Breast',
    description: 'Tender grilled chicken with herbs and spices',
    price: 8.99,
    category: 'lunch',
    meal_period: ['lunch', 'dinner'],
    image_url: 'https://images.unsplash.com/photo-1532550907401-a273c8c1c043?w=400',
    dietary_info: ['gluten_free'],
    is_available: true,
    calories: 350
  },
  {
    id: '3',
    dining_location_id: '1',
    name: 'Veggie Burger',
    description: 'Plant-based patty with lettuce, tomato, and vegan mayo',
    price: 7.50,
    category: 'lunch',
    meal_period: ['lunch', 'dinner'],
    image_url: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400',
    dietary_info: ['vegetarian', 'vegan'],
    is_available: true,
    calories: 280
  },
  {
    id: '4',
    dining_location_id: '1',
    name: 'Caesar Salad',
    description: 'Fresh romaine lettuce with parmesan and croutons',
    price: 5.99,
    category: 'lunch',
    meal_period: ['lunch', 'dinner'],
    image_url: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400',
    dietary_info: ['vegetarian'],
    is_available: true,
    calories: 180
  },
  {
    id: '5',
    dining_location_id: '1',
    name: 'Pasta Primavera',
    description: 'Fresh vegetables with pasta in garlic olive oil',
    price: 6.99,
    category: 'dinner',
    meal_period: ['dinner'],
    image_url: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d946?w=400',
    dietary_info: ['vegetarian'],
    is_available: true,
    calories: 320
  },
  {
    id: '6',
    dining_location_id: '1',
    name: 'Coffee',
    description: 'Freshly brewed coffee',
    price: 2.50,
    category: 'beverage',
    meal_period: ['all_day'],
    image_url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400',
    dietary_info: ['vegan'],
    is_available: true,
    calories: 5
  },
  {
    id: '7',
    dining_location_id: '1',
    name: 'Chocolate Chip Cookies',
    description: 'Freshly baked cookies with chocolate chips',
    price: 3.99,
    category: 'dessert',
    meal_period: ['all_day'],
    image_url: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400',
    dietary_info: ['vegetarian'],
    is_available: true,
    calories: 250
  }
];

exports.migrateData = async (event) => {
  try {
    // Migrate dining locations
    for (const location of diningLocationsData) {
      await dynamodb.put({
        TableName: DINING_LOCATIONS_TABLE,
        Item: location
      }).promise();
    }

    // Migrate menu items
    for (const item of menuItemsData) {
      await dynamodb.put({
        TableName: MENU_ITEMS_TABLE,
        Item: item
      }).promise();
    }

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
      },
      body: JSON.stringify({ 
        message: 'Data migration completed successfully',
        diningLocations: diningLocationsData.length,
        menuItems: menuItemsData.length
      })
    };
  } catch (error) {
    console.error('Error migrating data:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ error: 'Migration failed' })
    };
  }
};
