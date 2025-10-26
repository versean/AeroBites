const AWS = require('aws-sdk');

// Configure AWS
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'your_access_key_here',
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'your_secret_key_here',
  region: 'us-east-1'
});

const lambda = new AWS.Lambda();
const apigateway = new AWS.APIGateway();
const dynamodb = new AWS.DynamoDB();

async function deployAWSInfrastructure() {
  try {
    console.log('🚀 Deploying AWS Infrastructure for Brian AI...');

    // 1. Create DynamoDB Table
    console.log('📊 Creating DynamoDB table...');
    try {
      await dynamodb.createTable({
        TableName: 'brian-agent-memory',
        KeySchema: [
          { AttributeName: 'sessionId', KeyType: 'HASH' },
          { AttributeName: 'timestamp', KeyType: 'RANGE' }
        ],
        AttributeDefinitions: [
          { AttributeName: 'sessionId', AttributeType: 'S' },
          { AttributeName: 'timestamp', AttributeType: 'S' }
        ],
        BillingMode: 'PAY_PER_REQUEST'
      }).promise();
      console.log('✅ DynamoDB table created');
    } catch (error) {
      if (error.code === 'ResourceInUseException') {
        console.log('ℹ️ DynamoDB table already exists');
      } else {
        throw error;
      }
    }

    // 2. Create Lambda Functions
    console.log('⚡ Creating Lambda functions...');
    
    // AI Agent function
    const aiAgentCode = `
const AWS = require('aws-sdk');
const { BedrockRuntimeClient, InvokeModelCommand } = require('@aws-sdk/client-bedrock-runtime');

const bedrock = new BedrockRuntimeClient({
  region: 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'your_access_key_here',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'your_secret_key_here'
  }
});

const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  try {
    const { message, sessionId, userId } = JSON.parse(event.body);
    
    // Create AI prompt
    const prompt = \`You are Brian, a friendly food ordering assistant for UCSC students. You're warm, helpful, and use emojis naturally. Help students order food, handle dietary restrictions, and provide recommendations. Be conversational and show personality.

User message: \${message}

Respond as Brian:\`;
    
    // Call Bedrock Claude
    const params = {
      modelId: 'anthropic.claude-3-sonnet-20240229-v1:0',
      contentType: 'application/json',
      accept: 'application/json',
      body: JSON.stringify({
        anthropic_version: "bedrock-2023-05-31",
        max_tokens: 1000,
        messages: [{ role: "user", content: prompt }]
      })
    };

    const command = new InvokeModelCommand(params);
    const response = await bedrock.send(command);
    const responseBody = JSON.parse(new TextDecoder().decode(response.body));
    const aiResponse = responseBody.content[0].text;
    
    // Save conversation
    await dynamodb.put({
      TableName: 'brian-agent-memory',
      Item: {
        sessionId: sessionId,
        timestamp: new Date().toISOString(),
        role: 'assistant',
        message: aiResponse,
        userId: userId
      }
    }).promise();
    
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify({
        response: aiResponse,
        sessionId: sessionId,
        timestamp: new Date().toISOString()
      })
    };
    
  } catch (error) {
    console.error('Brian AI Error:', error);
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({
        error: 'Brian is having trouble connecting right now. Please try again!',
        details: error.message
      })
    };
  }
};
`;

    // Create AI Agent Lambda
    try {
      await lambda.createFunction({
        FunctionName: 'brian-ai-agent',
        Runtime: 'nodejs18.x',
        Role: 'arn:aws:iam::123456789012:role/lambda-execution-role', // This needs to be created
        Handler: 'index.handler',
        Code: {
          ZipFile: Buffer.from(aiAgentCode)
        },
        Description: 'Brian AI Agent for food ordering assistance',
        Timeout: 30,
        MemorySize: 256
      }).promise();
      console.log('✅ Brian AI Agent Lambda created');
    } catch (error) {
      if (error.code === 'ResourceConflictException') {
        console.log('ℹ️ Brian AI Agent Lambda already exists');
      } else {
        console.log('⚠️ Lambda creation failed (need IAM role):', error.message);
      }
    }

    console.log('🎉 AWS Infrastructure deployment completed!');
    console.log('📝 Note: You may need to create IAM roles and enable Bedrock access in AWS Console');
    
  } catch (error) {
    console.error('❌ Deployment failed:', error);
  }
}

deployAWSInfrastructure();
