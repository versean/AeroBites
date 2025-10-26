const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = process.env.MENU_ITEMS_TABLE;

// Get menu items by location
exports.getByLocation = async (event) => {
  try {
    const { dining_location_id } = event.queryStringParameters || {};
    
    if (!dining_location_id) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ error: 'dining_location_id is required' })
      };
    }

    const params = {
      TableName: TABLE_NAME,
      IndexName: 'LocationIndex',
      KeyConditionExpression: 'dining_location_id = :locationId',
      ExpressionAttributeValues: {
        ':locationId': dining_location_id
      }
    };

    const result = await dynamodb.query(params).promise();
    
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
      },
      body: JSON.stringify(result.Items)
    };
  } catch (error) {
    console.error('Error getting menu items:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};

// Get menu item by ID
exports.getById = async (event) => {
  try {
    const { id } = event.pathParameters;
    
    const params = {
      TableName: TABLE_NAME,
      Key: { id }
    };

    const result = await dynamodb.get(params).promise();
    
    if (!result.Item) {
      return {
        statusCode: 404,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ error: 'Menu item not found' })
      };
    }

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
      },
      body: JSON.stringify(result.Item)
    };
  } catch (error) {
    console.error('Error getting menu item:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};
