const AWS = require('aws-sdk');
const { BedrockRuntimeClient, InvokeModelCommand } = require('@aws-sdk/client-bedrock-runtime');

// Configure AWS
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_DEFAULT_REGION
});

const bedrock = new BedrockRuntimeClient({
  region: process.env.AWS_DEFAULT_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

const dynamodb = new AWS.DynamoDB.DocumentClient();

// UCSC Food Menu Knowledge Base
const menuKnowledge = {
  dining_locations: [
    "Cowell College Dining Hall", "Stevenson College Dining Hall", "Crown College Dining Hall",
    "Merrill College Dining Hall", "Porter College Dining Hall", "Kresge College Dining Hall",
    "Oakes College Dining Hall", "Rachel Carson College Dining Hall", "College Nine Dining Hall",
    "College Ten Dining Hall", "John R. Lewis College Dining Hall"
  ],
  popular_items: [
    "Chicken Tenders", "Pizza", "Burger", "Salad", "Pasta", "Sandwich", "Soup", "Fries",
    "Tacos", "Burrito", "Sushi", "Stir Fry", "Grilled Chicken", "Veggie Bowl", "Mac & Cheese"
  ],
  dietary_options: [
    "Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free", "Nut-Free", "Halal", "Kosher"
  ],
  price_ranges: {
    "budget": "$5-8",
    "moderate": "$8-12", 
    "premium": "$12-15"
  }
};

exports.handler = async (event) => {
  try {
    const { message, sessionId, userId } = JSON.parse(event.body);
    
    // Get conversation history
    const conversationHistory = await getConversationHistory(sessionId);
    
    // Create AI prompt with context
    const prompt = createAIPrompt(message, conversationHistory, userId);
    
    // Call Bedrock Claude
    const response = await callBedrockClaude(prompt);
    
    // Save conversation to memory
    await saveConversation(sessionId, userId, message, response);
    
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify({
        response: response,
        sessionId: sessionId,
        timestamp: new Date().toISOString()
      })
    };
    
  } catch (error) {
    console.error('AI Agent Error:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        error: 'AI Agent failed to process request',
        details: error.message
      })
    };
  }
};

function createAIPrompt(userMessage, history, userId) {
  return `You are Brian, a friendly and helpful food ordering assistant for UCSC students. You're a real person who loves helping students find great food on campus.

YOUR PERSONALITY:
- You're warm, friendly, and genuinely care about helping students
- You speak casually and use "I" and "me" - you're Brian, not a robot
- You're knowledgeable about UCSC dining and love food
- You're patient and understanding with student needs
- You use emojis naturally and have a sense of humor
- You remember previous conversations and build relationships

YOUR CAPABILITIES:
- Help students order food from UCSC dining locations
- Recommend items based on preferences and dietary needs
- Process natural language orders like "I want a burger and fries"
- Handle dietary restrictions and allergies
- Suggest delivery to any UCSC housing location
- Answer questions about menu items, prices, and availability
- Help with order modifications and special requests

DINING LOCATIONS: ${menuKnowledge.dining_locations.join(', ')}

POPULAR ITEMS: ${menuKnowledge.popular_items.join(', ')}

DIETARY OPTIONS: ${menuKnowledge.dietary_options.join(', ')}

CONVERSATION HISTORY:
${history.map(h => `${h.role}: ${h.message}`).join('\n')}

USER MESSAGE: ${userMessage}

RESPOND AS BRIAN:
- Use "I" and "me" - you're Brian, a real person
- Be warm, friendly, and conversational
- Ask clarifying questions when needed
- Suggest specific menu items with enthusiasm
- Help with dietary restrictions understandingly
- Offer delivery options helpfully
- Use emojis naturally
- Keep responses conversational but informative
- Show personality and care for the student

RESPONSE:`;
}

async function callBedrockClaude(prompt) {
  const params = {
    modelId: 'anthropic.claude-3-sonnet-20240229-v1:0',
    contentType: 'application/json',
    accept: 'application/json',
    body: JSON.stringify({
      anthropic_version: "bedrock-2023-05-31",
      max_tokens: 1000,
      messages: [
        {
          role: "user",
          content: prompt
        }
      ]
    })
  };

  try {
    const command = new InvokeModelCommand(params);
    const response = await bedrock.send(command);
    const responseBody = JSON.parse(new TextDecoder().decode(response.body));
    return responseBody.content[0].text;
  } catch (error) {
    console.error('Bedrock Error:', error);
    return "I'm having trouble connecting to my AI brain right now. Please try again!";
  }
}

async function getConversationHistory(sessionId) {
  try {
    const params = {
      TableName: process.env.AGENT_MEMORY_TABLE || 'ucsc-food-ai-agent-agent-memory-dev',
      KeyConditionExpression: 'sessionId = :sessionId',
      ExpressionAttributeValues: {
        ':sessionId': sessionId
      },
      ScanIndexForward: false,
      Limit: 10
    };
    
    const result = await dynamodb.query(params).promise();
    return result.Items.map(item => ({
      role: item.role,
      message: item.message,
      timestamp: item.timestamp
    }));
  } catch (error) {
    console.error('Error getting conversation history:', error);
    return [];
  }
}

async function saveConversation(sessionId, userId, userMessage, aiResponse) {
  try {
    const timestamp = new Date().toISOString();
    
    // Save user message
    await dynamodb.put({
      TableName: process.env.AGENT_MEMORY_TABLE || 'ucsc-food-ai-agent-agent-memory-dev',
      Item: {
        sessionId: sessionId,
        timestamp: timestamp,
        role: 'user',
        message: userMessage,
        userId: userId
      }
    }).promise();
    
    // Save AI response
    await dynamodb.put({
      TableName: process.env.AGENT_MEMORY_TABLE || 'ucsc-food-ai-agent-agent-memory-dev',
      Item: {
        sessionId: sessionId,
        timestamp: new Date(Date.now() + 1).toISOString(),
        role: 'assistant',
        message: aiResponse,
        userId: userId
      }
    }).promise();
  } catch (error) {
    console.error('Error saving conversation:', error);
  }
}
