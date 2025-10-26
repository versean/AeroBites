# AeroBites 

**Your favorite meals — delivered at the speed of flight.**

Meet AeroBites, the world's first drone-powered food delivery app. Order from your favorite local eateries and watch your meal take flight — literally. Our smart delivery drones soar above traffic to bring you hot, fresh food in record time. With real-time tracking, eco-friendly flights, and ultra-fast delivery, AeroBites makes takeout feel futuristic. Built by college students. For college students.

## UCSC Eats Implementation 

A comprehensive food delivery app for UCSC students with drone delivery and pickup options.

## Features

- **20+ Dining Locations** - All major UCSC dining halls, cafes, and markets
- **28+ Menu Items** - Diverse food options with dietary restrictions
- **Drone Delivery** - Fast 15-20 minute delivery to campus locations
- **Pickup Options** - Traditional pickup for cafes and markets
- **Real-time Order Tracking** - Track your order from kitchen to delivery
- **Dietary Filters** - Vegetarian, vegan, gluten-free, halal options
- **Meal Period Filtering** - Breakfast, lunch, dinner, all-day availability
- **Responsive Design** - Works perfectly on mobile and desktop

## Tech Stack

- **Frontend**: React 18, React Router, TanStack Query
- **Styling**: Tailwind CSS, Framer Motion
- **Icons**: Lucide React
- **State Management**: React Query for server state
- **Backend**: AWS Serverless (Lambda, DynamoDB, API Gateway)
- **Development**: Create React App, ESLint

## Dining Locations

### Dining Halls 
- Cowell/Stevenson Dining Hall
- Crown/Merrill Dining Hall  
- Porter/Kresge Dining Hall
- College Nine/Ten Dining Hall

### Cafes & Markets
- Oakes Cafe
- Rachel Carson Coffee House
- McHenry Library Cafe
- Science & Engineering Library Cafe
- Quarry Plaza Market
- Bay Tree Bookstore Cafe
- Music Center Cafe
- Engineering 2 Cafe
- Social Sciences Cafe
- Natural Sciences Cafe
- Student Union Cafe
- Rec Center Smoothie Bar
- East Field House Cafe
- West Field House Cafe
- Campus Store Snack Bar
- Graduate Student Lounge Cafe

## Menu Categories

- **Breakfast**: Pancakes, burritos, oatmeal, acai bowls
- **Lunch**: Burgers, salads, stir-fry, tacos
- **Dinner**: Pasta, salmon, ramen, curry
- **Beverages**: Coffee, smoothies, bubble tea, herbal tea
- **Snacks**: Cookies, muffins, fresh fruit
- **Desserts**: Chocolate chip cookies, vegan pastries

## Delivery Options

### Drone Delivery
- **Available for**: Dining halls, Student Union, Quarry Plaza Market
- **Delivery Time**: 15-20 minutes
- **Coverage**: All campus locations
- **Features**: Real-time tracking, weather-resistant

### Pickup
- **Available for**: All locations
- **Pickup Time**: 10-15 minutes
- **Locations**: Campus cafes, markets, dining halls

## 🛠️ Development Setup

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd aerobites

# Install dependencies
npm install

# Start development server
npm start
```

### Environment Setup
```bash
# Copy environment file
cp env.example .env

# Update with your API Gateway URL (for AWS deployment)
REACT_APP_API_URL=https://your-api-gateway-url.amazonaws.com/dev
```

## AWS Deployment

### Prerequisites
- AWS Account
- AWS CLI configured
- Serverless Framework

### Deploy Backend
```bash
# Install serverless dependencies
npm install -g serverless

# Deploy to AWS
serverless deploy --stage dev

# Migrate data
serverless invoke --function migrateData
```

### AWS Resources Created
- **DynamoDB Tables**: Dining locations, menu items, orders
- **Lambda Functions**: 8 serverless functions
- **API Gateway**: REST API with CORS
- **IAM Roles**: Proper permissions for Lambda functions

## Data Structure

### Dining Location
```json
{
  "id": "1",
  "name": "Cowell/Stevenson Dining Hall",
  "type": "dining_hall",
  "description": "Main dining hall serving breakfast, lunch, and dinner",
  "image_url": "https://images.unsplash.com/photo-1567521464027-f127ff144326?w=800",
  "hours": "7:00 AM - 9:00 PM",
  "location": "Cowell/Stevenson",
  "is_open": true,
  "supports_drone": true
}
```

### Menu Item
```json
{
  "id": "1",
  "dining_location_id": "1",
  "name": "Classic Breakfast Burrito",
  "description": "Scrambled eggs, bacon, cheese, and hash browns wrapped in a tortilla",
  "price": 7.99,
  "category": "breakfast",
  "meal_period": ["breakfast"],
  "image_url": "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400",
  "dietary_info": [],
  "is_available": true,
  "calories": 520
}
```

## UI Components

### Reusable Components
- **Button**: Primary, secondary, outline variants
- **Input**: Text input with validation
- **Badge**: Status indicators
- **Card**: Content containers
- **Tabs**: Navigation tabs
- **Select**: Dropdown selections
- **Radio Group**: Radio button groups
- **Textarea**: Multi-line text input

### Page Components
- **LocationCard**: Dining location display
- **MenuItemCard**: Food item display
- **CartItemCard**: Cart item management
- **OrderCard**: Order status display
- **OrderTracker**: Real-time order tracking

## Configuration

### Tailwind CSS
- Custom color palette for UCSC branding
- Responsive design breakpoints
- Component-based styling

### React Query
- 5-minute stale time for data
- 10-minute cache time
- Automatic background refetching
- Optimistic updates

## Mobile Responsiveness

- **Mobile-first design**
- **Touch-friendly interfaces**
- **Swipe gestures**
- **Responsive grid layouts**
- **Optimized images**

## Performance

- **Code splitting** with React.lazy
- **Image optimization** with proper sizing
- **Efficient state management** with React Query
- **Minimal bundle size** with tree shaking

## Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

## Build & Deploy

```bash
# Build for production
npm run build

# Deploy to AWS S3
aws s3 sync build/ s3://your-bucket-name

# Deploy with CloudFront
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Roadmap

- [ ] **User Authentication** - Login/signup system
- [ ] **Payment Integration** - Stripe/PayPal support
- [ ] **Push Notifications** - Order updates
- [ ] **Admin Dashboard** - Restaurant management
- [ ] **Analytics** - Usage tracking and insights
- [ ] **Multi-language** - Internationalization
- [ ] **Dark Mode** - Theme switching
- [ ] **Offline Support** - PWA capabilities
