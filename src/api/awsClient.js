// AWS API client for UCSC Eats
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://your-api-gateway-url.amazonaws.com/dev';

class AWSAPIClient {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Dining Locations
  async getDiningLocations() {
    return this.request('/dining-locations');
  }

  async getDiningLocation(id) {
    return this.request(`/dining-locations/${id}`);
  }

  // Menu Items
  async getMenuItems(diningLocationId) {
    return this.request(`/menu-items?dining_location_id=${diningLocationId}`);
  }

  async getMenuItem(id) {
    return this.request(`/menu-items/${id}`);
  }

  // Orders
  async createOrder(orderData) {
    return this.request('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData)
    });
  }

  async getOrders(userEmail) {
    return this.request(`/orders?user_email=${userEmail}`);
  }

  async getOrder(id) {
    return this.request(`/orders/${id}`);
  }

  // Migration
  async migrateData() {
    return this.request('/migrate-data', {
      method: 'POST'
    });
  }
}

// Create a mock user for development
const mockUser = {
  email: 'student@ucsc.edu',
  name: 'UCSC Student'
};

// Mock auth for development
const auth = {
  me: async () => mockUser
};

// Create entities object similar to base44Client
const entities = {
  DiningLocation: {
    list: async () => {
      const client = new AWSAPIClient();
      return client.getDiningLocations();
    },
    get: async (id) => {
      const client = new AWSAPIClient();
      return client.getDiningLocation(id);
    }
  },
  MenuItem: {
    filter: async ({ dining_location_id }) => {
      const client = new AWSAPIClient();
      return client.getMenuItems(dining_location_id);
    },
    get: async (id) => {
      const client = new AWSAPIClient();
      return client.getMenuItem(id);
    }
  },
  Order: {
    create: async (orderData) => {
      const client = new AWSAPIClient();
      return client.createOrder(orderData);
    },
    filter: async ({ user_email }, sort) => {
      const client = new AWSAPIClient();
      return client.getOrders(user_email);
    },
    get: async (id) => {
      const client = new AWSAPIClient();
      return client.getOrder(id);
    }
  }
};

// Export the API client similar to base44Client
export const awsAPI = {
  auth,
  entities
};

export default awsAPI;
