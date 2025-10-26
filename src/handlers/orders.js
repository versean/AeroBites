const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = process.env.ORDERS_TABLE;

// Create new order
exports.create = async (event) => {
  try {
    const orderData = JSON.parse(event.body);
    
    const order = {
      id: Date.now().toString(),
      ...orderData,
      created_at: new Date().toISOString(),
      status: 'pending'
    };

    const params = {
      TableName: TABLE_NAME,
      Item: order
    };

    await dynamodb.put(params).promise();
    
    return {
      statusCode: 201,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
      },
      body: JSON.stringify(order)
    };
  } catch (error) {
    console.error('Error creating order:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};

// Get orders by user email
exports.getByUser = async (event) => {
  try {
    const { user_email } = event.queryStringParameters || {};
    
    if (!user_email) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ error: 'user_email is required' })
      };
    }

    const params = {
      TableName: TABLE_NAME,
      IndexName: 'UserIndex',
      KeyConditionExpression: 'user_email = :userEmail',
      ExpressionAttributeValues: {
        ':userEmail': user_email
      },
      ScanIndexForward: false // Sort by created_at descending
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
    console.error('Error getting orders:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};

// Get order by ID
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
        body: JSON.stringify({ error: 'Order not found' })
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
    console.error('Error getting order:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};
