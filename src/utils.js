// Utility functions for the UCSC Eats app

export const createPageUrl = (pageName) => {
  const routes = {
    'Home': '/',
    'Menu': '/menu',
    'Cart': '/cart',
    'Orders': '/orders',
    'OrderDetail': '/order',
    'Profile': '/profile'
  };
  
  return routes[pageName] || '/';
};

export const formatCurrency = (amount) => {
  return `$${amount.toFixed(2)}`;
};

export const formatTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: 'numeric'
  });
};

export const getOrderStatusColor = (status) => {
  const colors = {
    'pending': 'bg-yellow-100 text-yellow-800',
    'confirmed': 'bg-blue-100 text-blue-800',
    'preparing': 'bg-orange-100 text-orange-800',
    'ready': 'bg-purple-100 text-purple-800',
    'in_transit': 'bg-indigo-100 text-indigo-800',
    'delivered': 'bg-green-100 text-green-800',
    'cancelled': 'bg-red-100 text-red-800'
  };
  
  return colors[status] || 'bg-gray-100 text-gray-800';
};

export const getOrderStatusText = (status) => {
  const texts = {
    'pending': 'Order Placed',
    'confirmed': 'Confirmed',
    'preparing': 'Preparing',
    'ready': 'Ready for Pickup',
    'in_transit': 'On the Way',
    'delivered': 'Delivered',
    'cancelled': 'Cancelled'
  };
  
  return texts[status] || status;
};
