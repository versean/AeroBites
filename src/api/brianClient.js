// Local Brian AI Client - Works without AWS deployment
class BrianClient {
  constructor() {
    this.conversationHistory = [];
    this.userPreferences = {};
  }

  async chat(message, sessionId, userId) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

    // Brian's personality and responses
    const response = this.generateBrianResponse(message);
    
    // Store conversation
    this.conversationHistory.push({
      role: 'user',
      message: message,
      timestamp: new Date().toISOString()
    });
    
    this.conversationHistory.push({
      role: 'assistant', 
      message: response,
      timestamp: new Date().toISOString()
    });

    return {
      response: response,
      sessionId: sessionId,
      timestamp: new Date().toISOString()
    };
  }

  generateBrianResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // Greeting responses
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return "Hey there! 👋 I'm Brian, your personal food assistant! I'm super excited to help you find some amazing food on campus. What are you in the mood for today?";
    }

    // Food ordering
    if (lowerMessage.includes('burger') || lowerMessage.includes('fries')) {
      return "Oh, burgers and fries! 🍔🍟 That's one of my favorites! I can get you a delicious burger from Crown College or Stevenson - they both have amazing burger bars. Would you like me to add that to your cart?";
    }

    if (lowerMessage.includes('pizza')) {
      return "Pizza is always a great choice! 🍕 I love the pizza at Merrill College - they have fresh slices and whole pies. What kind of toppings are you thinking? I can get you pepperoni, cheese, or even veggie!";
    }

    if (lowerMessage.includes('salad') || lowerMessage.includes('healthy')) {
      return "Great choice for staying healthy! 🥗 I'd recommend the Garden Salad from Crown College or the Veggie Bowl from Kresge. Both are super fresh and packed with nutrients. Want me to add one to your cart?";
    }

    // Dietary restrictions
    if (lowerMessage.includes('vegetarian') || lowerMessage.includes('veggie')) {
      return "Perfect! I've got tons of great vegetarian options for you! 🌱 The Veggie Burger at Stevenson is amazing, and Crown College has a fantastic salad bar. I can also get you some delicious pasta or veggie wraps. What sounds good?";
    }

    if (lowerMessage.includes('vegan')) {
      return "Absolutely! I love helping with vegan options! 🌿 Kresge College has an amazing vegan bowl, and Crown has great fruit salads. I can also get you some smoothies or fresh fruit. What would you like?";
    }

    if (lowerMessage.includes('gluten') || lowerMessage.includes('gluten-free')) {
      return "No problem at all! I've got you covered with gluten-free options! 🌾 The grilled chicken at Crown is fantastic, and Stevenson has great rice bowls. I can also get you fresh fruit or salads. What sounds good to you?";
    }

    // Location-specific
    if (lowerMessage.includes('crown') || lowerMessage.includes('crown college')) {
      return "Crown College has some of the best food on campus! 👑 I love their grilled chicken, sushi, and salad bar. They also have amazing tacos and stir fry. What are you thinking of trying?";
    }

    if (lowerMessage.includes('stevenson') || lowerMessage.includes('stevenson college')) {
      return "Stevenson is awesome! 🏛️ They have the best burger bar and amazing Casa options. I'm a big fan of their Casa Primera burritos and their stir fry station. What sounds good to you?";
    }

    if (lowerMessage.includes('cowell') || lowerMessage.includes('cowell college')) {
      return "Cowell is great! 🏰 They have amazing chicken tenders and a fantastic salad bar. I also love their pasta station and pizza. What are you in the mood for?";
    }

    // Delivery questions
    if (lowerMessage.includes('delivery') || lowerMessage.includes('deliver')) {
      return "I can definitely help with delivery! 🚁 We have drone delivery that takes just 5 minutes to any UCSC housing location. Just tell me where you want it delivered - Adams House, Casa Primera, or anywhere else on campus!";
    }

    // Price questions
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('expensive')) {
      return "Great question! 💰 Most items are between $6-12, with burgers around $8.99, pizza slices at $3.99, and salads around $6.99. I can help you find something that fits your budget - just let me know what you're looking for!";
    }

    // Recommendations
    if (lowerMessage.includes('recommend') || lowerMessage.includes('suggest') || lowerMessage.includes('what should')) {
      return "I'd love to give you some recommendations! 😊 Based on what's popular, I'd suggest the chicken tenders from Cowell, the burger from Stevenson, or the sushi from Crown. What type of food are you in the mood for?";
    }

    // Order processing
    if (lowerMessage.includes('order') || lowerMessage.includes('get me') || lowerMessage.includes('i want')) {
      return "Perfect! I'd be happy to help you order! 🛒 Just tell me what you'd like and I'll add it to your cart. You can say things like 'I want a burger and fries' or 'Get me a salad' and I'll take care of the rest!";
    }

    // Help requests
    if (lowerMessage.includes('help') || lowerMessage.includes('what can you')) {
      return "I'm here to help with everything food-related! 🤝 I can help you order food, find recommendations, handle dietary restrictions, suggest delivery options, and answer questions about UCSC dining. Just tell me what you need!";
    }

    // Thank you responses
    if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
      return "You're so welcome! 😊 I love helping students find great food. Is there anything else I can help you with? Maybe some recommendations or help with your order?";
    }

    // Default responses
    const defaultResponses = [
      "That sounds interesting! 🤔 I'd love to help you with that. Are you looking to order some food or get recommendations?",
      "I'm here to help! 😊 What kind of food are you in the mood for? I can suggest some great options from our UCSC dining halls.",
      "Great question! 💭 I can help you find the perfect meal. Are you looking for something specific or would you like some recommendations?",
      "I'd be happy to help! 🍽️ What are you thinking of ordering? I can get you burgers, pizza, salads, or whatever you're craving!",
      "That's awesome! 🎉 I love helping students find great food. What can I get started for you today?"
    ];

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  }

  async getRecommendations(preferences, dietaryRestrictions, budget, location) {
    // Mock recommendations based on input
    const recommendations = {
      top_recommendations: [
        "Chicken Tenders from Cowell College",
        "Burger from Stevenson College", 
        "Sushi from Crown College"
      ],
      dietary_suggestions: dietaryRestrictions.length > 0 ? [
        "Veggie Burger",
        "Garden Salad", 
        "Fruit Bowl"
      ] : [],
      budget_options: budget === 'budget' ? [
        "Pizza Slice",
        "Soup",
        "Fries"
      ] : [
        "Grilled Chicken",
        "Pasta",
        "Stir Fry"
      ],
      personalized_picks: [
        "Based on your preferences",
        "Popular at your location",
        "Great value options"
      ],
      reasoning: "I've picked these based on what's popular and what fits your preferences!"
    };

    return recommendations;
  }

  async processNaturalLanguageOrder(text, userId, sessionId) {
    // Mock order processing
    const items = [];
    
    if (text.toLowerCase().includes('burger')) {
      items.push({
        id: `item_${Date.now()}`,
        name: 'Burger',
        price: 8.99,
        quantity: 1,
        category: 'main',
        dining_location_name: 'Stevenson College Dining Hall'
      });
    }
    
    if (text.toLowerCase().includes('fries')) {
      items.push({
        id: `item_${Date.now() + 1}`,
        name: 'French Fries',
        price: 3.99,
        quantity: 1,
        category: 'side',
        dining_location_name: 'Stevenson College Dining Hall'
      });
    }

    if (text.toLowerCase().includes('salad')) {
      items.push({
        id: `item_${Date.now()}`,
        name: 'Garden Salad',
        price: 6.99,
        quantity: 1,
        category: 'healthy',
        dining_location_name: 'Crown College Dining Hall'
      });
    }

    return {
      success: true,
      parsedOrder: { items: items },
      cartItems: items,
      message: `Added ${items.length} items to your cart!`,
      timestamp: new Date().toISOString()
    };
  }
}

// Create singleton instance
const brianClient = new BrianClient();

export default brianClient;
