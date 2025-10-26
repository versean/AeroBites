// Mock base44 client for development
// In a real app, this would connect to the actual base44 API

class MockBase44Client {
  constructor() {
    this.entities = {
      DiningLocation: {
        list: async () => {
          // Mock dining locations data
          return [
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
            },
            {
              id: '11',
              name: 'Music Center Cafe',
              type: 'cafe',
              description: 'Artsy cafe near the music department',
              image_url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800',
              hours: '7:30 AM - 9:00 PM',
              location: 'Music Center',
              is_open: true,
              supports_drone: false
            },
            {
              id: '12',
              name: 'Engineering 2 Cafe',
              type: 'cafe',
              description: 'Engineering student hangout with tech vibes',
              image_url: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800',
              hours: '7:00 AM - 8:00 PM',
              location: 'Engineering 2 Building',
              is_open: true,
              supports_drone: false
            },
            {
              id: '13',
              name: 'Social Sciences Cafe',
              type: 'cafe',
              description: 'Cozy cafe in the social sciences building',
              image_url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800',
              hours: '8:00 AM - 7:00 PM',
              location: 'Social Sciences Building',
              is_open: true,
              supports_drone: false
            },
            {
              id: '14',
              name: 'Natural Sciences Cafe',
              type: 'cafe',
              description: 'Science-focused cafe with healthy options',
              image_url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800',
              hours: '7:00 AM - 8:00 PM',
              location: 'Natural Sciences Building',
              is_open: true,
              supports_drone: false
            },
            {
              id: '15',
              name: 'Student Union Cafe',
              type: 'cafe',
              description: 'Central campus cafe with diverse food options',
              image_url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800',
              hours: '6:00 AM - 10:00 PM',
              location: 'Student Union',
              is_open: true,
              supports_drone: true
            },
            {
              id: '16',
              name: 'Rec Center Smoothie Bar',
              type: 'cafe',
              description: 'Healthy smoothies and protein shakes',
              image_url: 'https://images.unsplash.com/photo-1553530666-ba11c7e2ea85?w=800',
              hours: '6:00 AM - 10:00 PM',
              location: 'Recreation Center',
              is_open: true,
              supports_drone: false
            },
            {
              id: '17',
              name: 'East Field House Cafe',
              type: 'cafe',
              description: 'Athletic facility cafe with energy foods',
              image_url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800',
              hours: '7:00 AM - 9:00 PM',
              location: 'East Field House',
              is_open: true,
              supports_drone: false
            },
            {
              id: '18',
              name: 'West Field House Cafe',
              type: 'cafe',
              description: 'Western campus athletic cafe',
              image_url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800',
              hours: '7:00 AM - 9:00 PM',
              location: 'West Field House',
              is_open: true,
              supports_drone: false
            },
            {
              id: '19',
              name: 'Campus Store Snack Bar',
              type: 'market',
              description: 'Quick snacks and beverages',
              image_url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
              hours: '8:00 AM - 8:00 PM',
              location: 'Campus Store',
              is_open: true,
              supports_drone: false
            },
            {
              id: '20',
              name: 'Graduate Student Lounge Cafe',
              type: 'cafe',
              description: 'Exclusive graduate student cafe',
              image_url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800',
              hours: '7:00 AM - 11:00 PM',
              location: 'Graduate Student Lounge',
              is_open: true,
              supports_drone: false
            }
          ];
        }
      },
      MenuItem: {
        filter: async ({ dining_location_id }) => {
          // Comprehensive menu items data for all dining locations
          const allMenuItems = [
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
            },

            // Crown/Merrill Dining Hall
            {
              id: '8',
              dining_location_id: '2',
              name: 'Pancakes',
              description: 'Fluffy pancakes with maple syrup and butter',
              price: 6.99,
              category: 'breakfast',
              meal_period: ['breakfast'],
              image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400',
              dietary_info: ['vegetarian'],
              is_available: true,
              calories: 420
            },
            {
              id: '9',
              dining_location_id: '2',
              name: 'Asian Stir Fry',
              description: 'Fresh vegetables and tofu in teriyaki sauce',
              price: 8.50,
              category: 'lunch',
              meal_period: ['lunch', 'dinner'],
              image_url: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400',
              dietary_info: ['vegetarian', 'vegan'],
              is_available: true,
              calories: 280
            },
            {
              id: '10',
              dining_location_id: '2',
              name: 'Fish Tacos',
              description: 'Grilled fish with cabbage slaw and lime crema',
              price: 9.99,
              category: 'lunch',
              meal_period: ['lunch', 'dinner'],
              image_url: 'https://images.unsplash.com/photo-1565299585323-38174c4a6b4a?w=400',
              dietary_info: ['gluten_free'],
              is_available: true,
              calories: 380
            },
            {
              id: '11',
              dining_location_id: '2',
              name: 'Quinoa Bowl',
              description: 'Quinoa with roasted vegetables and tahini dressing',
              price: 7.99,
              category: 'lunch',
              meal_period: ['lunch', 'dinner'],
              image_url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
              dietary_info: ['vegetarian', 'vegan', 'gluten_free'],
              is_available: true,
              calories: 320
            },
            {
              id: '12',
              dining_location_id: '2',
              name: 'Fresh Fruit',
              description: 'Seasonal fresh fruit selection',
              price: 4.99,
              category: 'snack',
              meal_period: ['all_day'],
              image_url: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400',
              dietary_info: ['vegetarian', 'vegan', 'gluten_free'],
              is_available: true,
              calories: 80
            },

            // Porter/Kresge Dining Hall
            {
              id: '13',
              dining_location_id: '3',
              name: 'Organic Oatmeal',
              description: 'Steel-cut oats with berries and nuts',
              price: 5.99,
              category: 'breakfast',
              meal_period: ['breakfast'],
              image_url: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400',
              dietary_info: ['vegetarian', 'vegan', 'gluten_free'],
              is_available: true,
              calories: 280
            },
            {
              id: '14',
              dining_location_id: '3',
              name: 'Sustainable Salmon',
              description: 'Wild-caught salmon with seasonal vegetables',
              price: 12.99,
              category: 'dinner',
              meal_period: ['dinner'],
              image_url: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400',
              dietary_info: ['gluten_free'],
              is_available: true,
              calories: 420
            },
            {
              id: '15',
              dining_location_id: '3',
              name: 'Kale Caesar Salad',
              description: 'Organic kale with vegan caesar dressing',
              price: 6.99,
              category: 'lunch',
              meal_period: ['lunch', 'dinner'],
              image_url: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400',
              dietary_info: ['vegetarian', 'vegan'],
              is_available: true,
              calories: 150
            },
            {
              id: '16',
              dining_location_id: '3',
              name: 'Green Smoothie',
              description: 'Spinach, banana, and mango smoothie',
              price: 4.99,
              category: 'beverage',
              meal_period: ['all_day'],
              image_url: 'https://images.unsplash.com/photo-1553530666-ba11c7e2ea85?w=400',
              dietary_info: ['vegetarian', 'vegan', 'gluten_free'],
              is_available: true,
              calories: 120
            },

            // College Nine/Ten Dining Hall
            {
              id: '17',
              dining_location_id: '4',
              name: 'International Breakfast',
              description: 'Global breakfast options including congee and croissants',
              price: 8.99,
              category: 'breakfast',
              meal_period: ['breakfast'],
              image_url: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400',
              dietary_info: [],
              is_available: true,
              calories: 450
            },
            {
              id: '18',
              dining_location_id: '4',
              name: 'Curry Bowl',
              description: 'Spicy curry with rice and naan bread',
              price: 9.99,
              category: 'lunch',
              meal_period: ['lunch', 'dinner'],
              image_url: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400',
              dietary_info: ['vegetarian', 'vegan'],
              is_available: true,
              calories: 380
            },
            {
              id: '19',
              dining_location_id: '4',
              name: 'Ramen Bowl',
              description: 'Authentic ramen with soft-boiled egg and vegetables',
              price: 10.99,
              category: 'dinner',
              meal_period: ['dinner'],
              image_url: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400',
              dietary_info: [],
              is_available: true,
              calories: 520
            },
            {
              id: '20',
              dining_location_id: '4',
              name: 'Bubble Tea',
              description: 'Tapioca pearls in sweet tea',
              price: 4.50,
              category: 'beverage',
              meal_period: ['all_day'],
              image_url: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400',
              dietary_info: ['vegetarian', 'vegan'],
              is_available: true,
              calories: 180
            },

            // Oakes Cafe
            {
              id: '21',
              dining_location_id: '5',
              name: 'Artisan Coffee',
              description: 'Single-origin coffee beans, freshly roasted',
              price: 3.50,
              category: 'beverage',
              meal_period: ['all_day'],
              image_url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400',
              dietary_info: ['vegan'],
              is_available: true,
              calories: 5
            },
            {
              id: '22',
              dining_location_id: '5',
              name: 'Croissant',
              description: 'Buttery, flaky French pastry',
              price: 3.99,
              category: 'breakfast',
              meal_period: ['breakfast', 'all_day'],
              image_url: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400',
              dietary_info: ['vegetarian'],
              is_available: true,
              calories: 280
            },
            {
              id: '23',
              dining_location_id: '5',
              name: 'Avocado Toast',
              description: 'Smashed avocado on sourdough with sea salt',
              price: 6.99,
              category: 'breakfast',
              meal_period: ['breakfast', 'lunch'],
              image_url: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400',
              dietary_info: ['vegetarian', 'vegan'],
              is_available: true,
              calories: 320
            },
            {
              id: '24',
              dining_location_id: '5',
              name: 'Muffin',
              description: 'Freshly baked blueberry muffin',
              price: 2.99,
              category: 'snack',
              meal_period: ['all_day'],
              image_url: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400',
              dietary_info: ['vegetarian'],
              is_available: true,
              calories: 200
            },

            // Rachel Carson Coffee House
            {
              id: '25',
              dining_location_id: '6',
              name: 'Organic Coffee',
              description: 'Fair-trade organic coffee',
              price: 3.25,
              category: 'beverage',
              meal_period: ['all_day'],
              image_url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400',
              dietary_info: ['vegan'],
              is_available: true,
              calories: 5
            },
            {
              id: '26',
              dining_location_id: '6',
              name: 'Vegan Pastry',
              description: 'Plant-based croissant with seasonal jam',
              price: 4.50,
              category: 'breakfast',
              meal_period: ['breakfast', 'all_day'],
              image_url: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400',
              dietary_info: ['vegetarian', 'vegan'],
              is_available: true,
              calories: 250
            },
            {
              id: '27',
              dining_location_id: '6',
              name: 'Acai Bowl',
              description: 'Acai smoothie bowl with granola and berries',
              price: 8.99,
              category: 'breakfast',
              meal_period: ['breakfast', 'lunch'],
              image_url: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=400',
              dietary_info: ['vegetarian', 'vegan', 'gluten_free'],
              is_available: true,
              calories: 280
            },
            {
              id: '28',
              dining_location_id: '6',
              name: 'Herbal Tea',
              description: 'Selection of organic herbal teas',
              price: 2.75,
              category: 'beverage',
              meal_period: ['all_day'],
              image_url: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400',
              dietary_info: ['vegetarian', 'vegan', 'gluten_free'],
              is_available: true,
              calories: 0
            }
          ];
          
          return allMenuItems.filter(item => item.dining_location_id === dining_location_id);
        }
      },
      Order: {
        create: async (orderData) => {
          console.log('Creating order:', orderData);
          // Simulate API call
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve({ id: Date.now().toString(), ...orderData });
            }, 1000);
          });
        },
        filter: async (filters, sort) => {
          // Mock orders data
          return [
            {
              id: '1',
              order_number: 'UCSC12345678',
              user_email: 'student@ucsc.edu',
              delivery_method: 'drone',
              delivery_address: 'Adams House',
              status: 'preparing',
              items: [
                {
                  menu_item_id: '1',
                  menu_item_name: 'Grilled Chicken Breast',
                  dining_location_name: 'Cowell/Stevenson Dining Hall',
                  quantity: 1,
                  price: 8.99
                }
              ],
              total_amount: 11.98,
              estimated_time: '15-20 minutes',
              placed_at: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
              notes: 'Please deliver to front door'
            }
          ];
        }
      }
    };
    
    this.auth = {
      me: async () => {
        return {
          id: '1',
          email: 'student@ucsc.edu',
          name: 'UCSC Student'
        };
      }
    };
  }
}

export const base44 = new MockBase44Client();
