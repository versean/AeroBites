# UCSC Eats AWS Deployment Guide

This guide will help you deploy the UCSC Eats application to AWS using Serverless Framework.

## Prerequisites

1. **AWS Account**: You need an AWS account with appropriate permissions
2. **AWS CLI**: Install and configure AWS CLI
3. **Node.js**: Version 18 or higher
4. **Serverless Framework**: Install globally with `npm install -g serverless`

## Setup Steps

### 1. Install Dependencies

```bash
# Install serverless dependencies
npm install

# Install serverless framework globally
npm install -g serverless
```

### 2. Configure AWS Credentials

```bash
# Configure AWS CLI
aws configure

# Or set environment variables
export AWS_ACCESS_KEY_ID=your_access_key
export AWS_SECRET_ACCESS_KEY=your_secret_key
export AWS_DEFAULT_REGION=us-west-2
```

### 3. Deploy the API

```bash
# Deploy to development
npm run deploy:dev

# Deploy to production
npm run deploy:prod
```

### 4. Migrate Data

After deployment, run the data migration:

```bash
# Get the API Gateway URL from the deployment output
# Then update your .env file with the URL
REACT_APP_API_URL=https://your-api-gateway-url.amazonaws.com/dev

# Run data migration
npm run migrate
```

### 5. Update Frontend

Update your React app's environment variables:

```bash
# Copy the example environment file
cp env.example .env

# Edit .env with your API Gateway URL
REACT_APP_API_URL=https://your-api-gateway-url.amazonaws.com/dev
```

### 6. Test the Application

```bash
# Start the React development server
npm start
```

## API Endpoints

After deployment, you'll have the following endpoints:

- `GET /dining-locations` - Get all dining locations
- `GET /dining-locations/{id}` - Get specific dining location
- `GET /menu-items?dining_location_id={id}` - Get menu items for location
- `GET /menu-items/{id}` - Get specific menu item
- `POST /orders` - Create new order
- `GET /orders?user_email={email}` - Get orders for user
- `GET /orders/{id}` - Get specific order
- `POST /migrate-data` - Migrate sample data to DynamoDB

## AWS Resources Created

- **DynamoDB Tables**:
  - `ucsc-eats-api-dining-locations-dev`
  - `ucsc-eats-api-menu-items-dev`
  - `ucsc-eats-api-orders-dev`

- **Lambda Functions**:
  - `getDiningLocations`
  - `getDiningLocation`
  - `getMenuItems`
  - `getMenuItem`
  - `createOrder`
  - `getOrders`
  - `getOrder`
  - `migrateData`

- **API Gateway**: REST API with CORS enabled

## Cost Considerations

- **DynamoDB**: Pay-per-request pricing (very low cost for development)
- **Lambda**: Free tier includes 1M requests/month
- **API Gateway**: $3.50 per million API calls

## Troubleshooting

### Common Issues

1. **CORS Errors**: Make sure API Gateway has CORS enabled
2. **Permission Errors**: Check IAM roles and policies
3. **Data Not Loading**: Verify data migration was successful

### Useful Commands

```bash
# View logs
serverless logs -f getDiningLocations

# Remove deployment
serverless remove

# Local development
serverless offline
```

## Production Considerations

1. **Environment Variables**: Use AWS Systems Manager Parameter Store
2. **Monitoring**: Set up CloudWatch alarms
3. **Security**: Implement API keys or authentication
4. **Scaling**: Configure DynamoDB auto-scaling
5. **Backup**: Enable DynamoDB point-in-time recovery
