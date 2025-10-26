// Mock base44 client for development
// In a real app, this would connect to the actual base44 API

class MockBase44Client {
  constructor() {
    this.entities = {
      DiningLocation: {
        list: async () => {
          console.log('Fetching dining locations...');
          // Mock dining locations data
          const locations = [
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
          console.log('Returning locations:', locations.length);
          return locations;
        }
      },
      MenuItem: {
        filter: async ({ dining_location_id }) => {
          console.log('Filtering menu items for location:', dining_location_id);
          // Comprehensive menu items data for all dining locations
          const allMenuItems = [
            // Cowell/Stevenson Dining Hall (12 items)
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
              name: 'Pancakes with Syrup',
              description: 'Fluffy buttermilk pancakes with maple syrup and butter',
              price: 6.99,
              category: 'breakfast',
              meal_period: ['breakfast'],
              image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400',
              dietary_info: ['vegetarian'],
              is_available: true,
              calories: 420
            },
            {
              id: '3',
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
              id: '4',
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
              id: '5',
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
              id: '6',
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
              id: '7',
              dining_location_id: '1',
              name: 'BBQ Ribs',
              description: 'Slow-cooked ribs with tangy barbecue sauce',
              price: 11.99,
              category: 'dinner',
              meal_period: ['dinner'],
              image_url: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400',
              dietary_info: ['gluten_free'],
              is_available: true,
              calories: 580
            },
            {
              id: '8',
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
              id: '9',
              dining_location_id: '1',
              name: 'Fresh Orange Juice',
              description: 'Freshly squeezed orange juice',
              price: 3.99,
              category: 'beverage',
              meal_period: ['all_day'],
              image_url: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400',
              dietary_info: ['vegetarian', 'vegan', 'gluten_free'],
              is_available: true,
              calories: 110
            },
            {
              id: '10',
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
            {
              id: '11',
              dining_location_id: '1',
              name: 'Apple Pie',
              description: 'Homemade apple pie with cinnamon and sugar',
              price: 4.99,
              category: 'dessert',
              meal_period: ['all_day'],
              image_url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400',
              dietary_info: ['vegetarian'],
              is_available: true,
              calories: 320
            },
            {
              id: '12',
              dining_location_id: '1',
              name: 'Mixed Nuts',
              description: 'Assorted nuts and dried fruits',
              price: 4.50,
              category: 'snack',
              meal_period: ['all_day'],
              image_url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',
              dietary_info: ['vegetarian', 'vegan', 'gluten_free'],
              is_available: true,
              calories: 180
            },

            // Crown/Merrill Dining Hall (12 items)
            {
              id: '13',
              dining_location_id: '2',
              name: 'French Toast',
              description: 'Thick slices of bread dipped in egg and cinnamon',
              price: 7.99,
              category: 'breakfast',
              meal_period: ['breakfast'],
              image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400',
              dietary_info: ['vegetarian'],
              is_available: true,
              calories: 480
            },
            {
              id: '14',
              dining_location_id: '2',
              name: 'Acai Bowl',
              description: 'Acai smoothie bowl with granola and fresh berries',
              price: 8.99,
              category: 'breakfast',
              meal_period: ['breakfast'],
              image_url: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400',
              dietary_info: ['vegetarian', 'vegan', 'gluten_free'],
              is_available: true,
              calories: 350
            },
            {
              id: '15',
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
              id: '16',
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
              id: '17',
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
              id: '18',
              dining_location_id: '2',
              name: 'Beef Stir Fry',
              description: 'Tender beef strips with mixed vegetables in soy sauce',
              price: 10.99,
              category: 'dinner',
              meal_period: ['dinner'],
              image_url: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400',
              dietary_info: ['gluten_free'],
              is_available: true,
              calories: 420
            },
            {
              id: '19',
              dining_location_id: '2',
              name: 'Teriyaki Chicken',
              description: 'Grilled chicken with teriyaki glaze and steamed rice',
              price: 9.99,
              category: 'dinner',
              meal_period: ['dinner'],
              image_url: 'https://images.unsplash.com/photo-1532550907401-a273c8c1c043?w=400',
              dietary_info: ['gluten_free'],
              is_available: true,
              calories: 450
            },
            {
              id: '20',
              dining_location_id: '2',
              name: 'Green Tea',
              description: 'Premium green tea with antioxidants',
              price: 2.99,
              category: 'beverage',
              meal_period: ['all_day'],
              image_url: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400',
              dietary_info: ['vegetarian', 'vegan', 'gluten_free'],
              is_available: true,
              calories: 2
            },
            {
              id: '21',
              dining_location_id: '2',
              name: 'Smoothie Bowl',
              description: 'Fruit smoothie with granola and coconut flakes',
              price: 6.99,
              category: 'beverage',
              meal_period: ['all_day'],
              image_url: 'https://images.unsplash.com/photo-1553530666-ba11c7e2ea85?w=400',
              dietary_info: ['vegetarian', 'vegan', 'gluten_free'],
              is_available: true,
              calories: 200
            },
            {
              id: '22',
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
            {
              id: '23',
              dining_location_id: '2',
              name: 'Energy Bars',
              description: 'Homemade energy bars with nuts and dates',
              price: 3.99,
              category: 'snack',
              meal_period: ['all_day'],
              image_url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',
              dietary_info: ['vegetarian', 'vegan', 'gluten_free'],
              is_available: true,
              calories: 220
            },
            {
              id: '24',
              dining_location_id: '2',
              name: 'Tiramisu',
              description: 'Classic Italian dessert with coffee and mascarpone',
              price: 5.99,
              category: 'dessert',
              meal_period: ['all_day'],
              image_url: 'https://images.unsplash.com/photo-1571877227200-a63c7aee83d0?w=400',
              dietary_info: ['vegetarian'],
              is_available: true,
              calories: 380
            },

            // Porter/Kresge Dining Hall (12 items)
            {
              id: '25',
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
              id: '26',
              dining_location_id: '3',
              name: 'Avocado Toast',
              description: 'Smashed avocado on sourdough with hemp seeds',
              price: 6.99,
              category: 'breakfast',
              meal_period: ['breakfast'],
              image_url: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400',
              dietary_info: ['vegetarian', 'vegan'],
              is_available: true,
              calories: 320
            },
            {
              id: '27',
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
              id: '28',
              dining_location_id: '3',
              name: 'Mediterranean Wrap',
              description: 'Hummus, vegetables, and falafel in whole wheat wrap',
              price: 7.99,
              category: 'lunch',
              meal_period: ['lunch', 'dinner'],
              image_url: 'https://images.unsplash.com/photo-1565299585323-38174c4a6b4a?w=400',
              dietary_info: ['vegetarian', 'vegan'],
              is_available: true,
              calories: 380
            },
            {
              id: '29',
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
              id: '30',
              dining_location_id: '3',
              name: 'Mushroom Risotto',
              description: 'Creamy arborio rice with wild mushrooms',
              price: 9.99,
              category: 'dinner',
              meal_period: ['dinner'],
              image_url: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400',
              dietary_info: ['vegetarian'],
              is_available: true,
              calories: 450
            },
            {
              id: '31',
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
            {
              id: '32',
              dining_location_id: '3',
              name: 'Kombucha',
              description: 'Fermented tea with probiotics',
              price: 3.99,
              category: 'beverage',
              meal_period: ['all_day'],
              image_url: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400',
              dietary_info: ['vegetarian', 'vegan', 'gluten_free'],
              is_available: true,
              calories: 30
            },
            {
              id: '33',
              dining_location_id: '3',
              name: 'Trail Mix',
              description: 'Organic nuts, seeds, and dried fruit',
              price: 4.50,
              category: 'snack',
              meal_period: ['all_day'],
              image_url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',
              dietary_info: ['vegetarian', 'vegan', 'gluten_free'],
              is_available: true,
              calories: 200
            },
            {
              id: '34',
              dining_location_id: '3',
              name: 'Veggie Chips',
              description: 'Baked vegetable chips with sea salt',
              price: 3.99,
              category: 'snack',
              meal_period: ['all_day'],
              image_url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',
              dietary_info: ['vegetarian', 'vegan', 'gluten_free'],
              is_available: true,
              calories: 150
            },
            {
              id: '35',
              dining_location_id: '3',
              name: 'Vegan Cheesecake',
              description: 'Cashew-based cheesecake with berry compote',
              price: 6.99,
              category: 'dessert',
              meal_period: ['all_day'],
              image_url: 'https://images.unsplash.com/photo-1571877227200-a63c7aee83d0?w=400',
              dietary_info: ['vegetarian', 'vegan', 'gluten_free'],
              is_available: true,
              calories: 280
            },
            {
              id: '36',
              dining_location_id: '3',
              name: 'Chocolate Avocado Mousse',
              description: 'Rich chocolate mousse made with avocado',
              price: 5.99,
              category: 'dessert',
              meal_period: ['all_day'],
              image_url: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400',
              dietary_info: ['vegetarian', 'vegan', 'gluten_free'],
              is_available: true,
              calories: 220
            },

            // College Nine/Ten Dining Hall (12 items)
            {
              id: '37',
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
              id: '38',
              dining_location_id: '4',
              name: 'Dim Sum Platter',
              description: 'Assorted steamed dumplings and buns',
              price: 9.99,
              category: 'breakfast',
              meal_period: ['breakfast'],
              image_url: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400',
              dietary_info: [],
              is_available: true,
              calories: 380
            },
            {
              id: '39',
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
              id: '40',
              dining_location_id: '4',
              name: 'Pad Thai',
              description: 'Stir-fried rice noodles with shrimp and vegetables',
              price: 10.99,
              category: 'lunch',
              meal_period: ['lunch', 'dinner'],
              image_url: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400',
              dietary_info: ['gluten_free'],
              is_available: true,
              calories: 420
            },
            {
              id: '41',
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
              id: '42',
              dining_location_id: '4',
              name: 'Sushi Platter',
              description: 'Fresh sushi rolls with wasabi and pickled ginger',
              price: 12.99,
              category: 'dinner',
              meal_period: ['dinner'],
              image_url: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400',
              dietary_info: ['gluten_free'],
              is_available: true,
              calories: 350
            },
            {
              id: '43',
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
            {
              id: '44',
              dining_location_id: '4',
              name: 'Thai Iced Tea',
              description: 'Sweet Thai tea with condensed milk',
              price: 3.99,
              category: 'beverage',
              meal_period: ['all_day'],
              image_url: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400',
              dietary_info: ['vegetarian'],
              is_available: true,
              calories: 150
            },
            {
              id: '45',
              dining_location_id: '4',
              name: 'Mochi Ice Cream',
              description: 'Japanese rice cake with ice cream filling',
              price: 4.99,
              category: 'dessert',
              meal_period: ['all_day'],
              image_url: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400',
              dietary_info: ['vegetarian'],
              is_available: true,
              calories: 120
            },
            {
              id: '46',
              dining_location_id: '4',
              name: 'Fortune Cookies',
              description: 'Crispy cookies with fortune messages',
              price: 2.99,
              category: 'dessert',
              meal_period: ['all_day'],
              image_url: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400',
              dietary_info: ['vegetarian'],
              is_available: true,
              calories: 50
            },
            {
              id: '47',
              dining_location_id: '4',
              name: 'Edamame',
              description: 'Steamed soybeans with sea salt',
              price: 3.99,
              category: 'snack',
              meal_period: ['all_day'],
              image_url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',
              dietary_info: ['vegetarian', 'vegan', 'gluten_free'],
              is_available: true,
              calories: 100
            },
            {
              id: '48',
              dining_location_id: '4',
              name: 'Seaweed Salad',
              description: 'Fresh seaweed with sesame dressing',
              price: 4.50,
              category: 'snack',
              meal_period: ['all_day'],
              image_url: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400',
              dietary_info: ['vegetarian', 'vegan', 'gluten_free'],
              is_available: true,
              calories: 60
            },

            // Oakes Cafe (12 items)
            {
              id: '49',
              dining_location_id: '5',
              name: 'Bagel with Cream Cheese',
              description: 'Fresh bagel with cream cheese and lox',
              price: 5.99,
              category: 'breakfast',
              meal_period: ['breakfast'],
              image_url: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400',
              dietary_info: ['vegetarian'],
              is_available: true,
              calories: 320
            },
            {
              id: '50',
              dining_location_id: '5',
              name: 'Yogurt Parfait',
              description: 'Greek yogurt with granola and berries',
              price: 6.99,
              category: 'breakfast',
              meal_period: ['breakfast'],
              image_url: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400',
              dietary_info: ['vegetarian'],
              is_available: true,
              calories: 280
            },
            {
              id: '51',
              dining_location_id: '5',
              name: 'Turkey Sandwich',
              description: 'Sliced turkey with lettuce, tomato, and mayo',
              price: 7.99,
              category: 'lunch',
              meal_period: ['lunch', 'dinner'],
              image_url: 'https://images.unsplash.com/photo-1539252554453-80ab65ce3586?w=400',
              dietary_info: [],
              is_available: true,
              calories: 380
            },
            {
              id: '52',
              dining_location_id: '5',
              name: 'Caprese Panini',
              description: 'Mozzarella, tomato, and basil on ciabatta',
              price: 8.99,
              category: 'lunch',
              meal_period: ['lunch', 'dinner'],
              image_url: 'https://images.unsplash.com/photo-1539252554453-80ab65ce3586?w=400',
              dietary_info: ['vegetarian'],
              is_available: true,
              calories: 420
            },
            {
              id: '53',
              dining_location_id: '5',
              name: 'Chicken Caesar Wrap',
              description: 'Grilled chicken with caesar dressing in tortilla',
              price: 8.50,
              category: 'dinner',
              meal_period: ['dinner'],
              image_url: 'https://images.unsplash.com/photo-1539252554453-80ab65ce3586?w=400',
              dietary_info: ['gluten_free'],
              is_available: true,
              calories: 450
            },
            {
              id: '54',
              dining_location_id: '5',
              name: 'Veggie Wrap',
              description: 'Fresh vegetables with hummus in spinach wrap',
              price: 7.50,
              category: 'dinner',
              meal_period: ['dinner'],
              image_url: 'https://images.unsplash.com/photo-1539252554453-80ab65ce3586?w=400',
              dietary_info: ['vegetarian', 'vegan'],
              is_available: true,
              calories: 320
            },
            {
              id: '55',
              dining_location_id: '5',
              name: 'Latte',
              description: 'Espresso with steamed milk',
              price: 4.50,
              category: 'beverage',
              meal_period: ['all_day'],
              image_url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400',
              dietary_info: ['vegetarian'],
              is_available: true,
              calories: 120
            },
            {
              id: '56',
              dining_location_id: '5',
              name: 'Chai Tea',
              description: 'Spiced tea with milk and honey',
              price: 3.99,
              category: 'beverage',
              meal_period: ['all_day'],
              image_url: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400',
              dietary_info: ['vegetarian'],
              is_available: true,
              calories: 80
            },
            {
              id: '57',
              dining_location_id: '5',
              name: 'Muffins',
              description: 'Fresh baked muffins in various flavors',
              price: 3.50,
              category: 'snack',
              meal_period: ['all_day'],
              image_url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',
              dietary_info: ['vegetarian'],
              is_available: true,
              calories: 200
            },
            {
              id: '58',
              dining_location_id: '5',
              name: 'Pretzel',
              description: 'Soft pretzel with mustard',
              price: 3.99,
              category: 'snack',
              meal_period: ['all_day'],
              image_url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',
              dietary_info: ['vegetarian'],
              is_available: true,
              calories: 250
            },
            {
              id: '59',
              dining_location_id: '5',
              name: 'Cheesecake Slice',
              description: 'New York style cheesecake',
              price: 5.99,
              category: 'dessert',
              meal_period: ['all_day'],
              image_url: 'https://images.unsplash.com/photo-1571877227200-a63c7aee83d0?w=400',
              dietary_info: ['vegetarian'],
              is_available: true,
              calories: 350
            },
            {
              id: '60',
              dining_location_id: '5',
              name: 'Brownie',
              description: 'Chocolate brownie with nuts',
              price: 4.50,
              category: 'dessert',
              meal_period: ['all_day'],
              image_url: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400',
              dietary_info: ['vegetarian'],
              is_available: true,
              calories: 280
            },

            // Rachel Carson Coffee House (12 items)
            {
              id: '61',
              dining_location_id: '6',
              name: 'Croissant',
              description: 'Buttery French croissant',
              price: 3.99,
              category: 'breakfast',
              meal_period: ['breakfast'],
              image_url: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400',
              dietary_info: ['vegetarian'],
              is_available: true,
              calories: 280
            },
            {
              id: '62',
              dining_location_id: '6',
              name: 'Eggs Benedict',
              description: 'Poached eggs on English muffin with hollandaise',
              price: 9.99,
              category: 'breakfast',
              meal_period: ['breakfast'],
              image_url: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400',
              dietary_info: ['vegetarian'],
              is_available: true,
              calories: 520
            },
            {
              id: '63',
              dining_location_id: '6',
              name: 'Club Sandwich',
              description: 'Triple decker with turkey, bacon, and avocado',
              price: 9.99,
              category: 'lunch',
              meal_period: ['lunch', 'dinner'],
              image_url: 'https://images.unsplash.com/photo-1539252554453-80ab65ce3586?w=400',
              dietary_info: [],
              is_available: true,
              calories: 580
            },
            {
              id: '64',
              dining_location_id: '6',
              name: 'Grilled Cheese',
              description: 'Three cheese grilled sandwich with tomato soup',
              price: 7.99,
              category: 'lunch',
              meal_period: ['lunch', 'dinner'],
              image_url: 'https://images.unsplash.com/photo-1539252554453-80ab65ce3586?w=400',
              dietary_info: ['vegetarian'],
              is_available: true,
              calories: 450
            },
            {
              id: '65',
              dining_location_id: '6',
              name: 'Beef Stroganoff',
              description: 'Tender beef in creamy mushroom sauce over noodles',
              price: 11.99,
              category: 'dinner',
              meal_period: ['dinner'],
              image_url: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400',
              dietary_info: [],
              is_available: true,
              calories: 520
            },
            {
              id: '66',
              dining_location_id: '6',
              name: 'Mac and Cheese',
              description: 'Creamy macaroni and cheese with breadcrumbs',
              price: 8.99,
              category: 'dinner',
              meal_period: ['dinner'],
              image_url: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d946?w=400',
              dietary_info: ['vegetarian'],
              is_available: true,
              calories: 480
            },
            {
              id: '67',
              dining_location_id: '6',
              name: 'Cappuccino',
              description: 'Espresso with steamed milk foam',
              price: 4.99,
              category: 'beverage',
              meal_period: ['all_day'],
              image_url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400',
              dietary_info: ['vegetarian'],
              is_available: true,
              calories: 80
            },
            {
              id: '68',
              dining_location_id: '6',
              name: 'Hot Chocolate',
              description: 'Rich hot chocolate with whipped cream',
              price: 3.99,
              category: 'beverage',
              meal_period: ['all_day'],
              image_url: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400',
              dietary_info: ['vegetarian'],
              is_available: true,
              calories: 200
            },
            {
              id: '69',
              dining_location_id: '6',
              name: 'Scones',
              description: 'Fresh baked scones with jam and cream',
              price: 4.50,
              category: 'snack',
              meal_period: ['all_day'],
              image_url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',
              dietary_info: ['vegetarian'],
              is_available: true,
              calories: 220
            },
            {
              id: '70',
              dining_location_id: '6',
              name: 'Fruit Tart',
              description: 'Pastry shell with custard and fresh fruit',
              price: 5.99,
              category: 'dessert',
              meal_period: ['all_day'],
              image_url: 'https://images.unsplash.com/photo-1571877227200-a63c7aee83d0?w=400',
              dietary_info: ['vegetarian'],
              is_available: true,
              calories: 300
            },
            {
              id: '71',
              dining_location_id: '6',
              name: 'Chocolate Cake',
              description: 'Rich chocolate layer cake',
              price: 6.99,
              category: 'dessert',
              meal_period: ['all_day'],
              image_url: 'https://images.unsplash.com/photo-1571877227200-a63c7aee83d0?w=400',
              dietary_info: ['vegetarian'],
              is_available: true,
              calories: 420
            },
            {
              id: '72',
              dining_location_id: '6',
              name: 'Granola Bars',
              description: 'Homemade granola bars with nuts and dried fruit',
              price: 3.99,
              category: 'snack',
              meal_period: ['all_day'],
              image_url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',
              dietary_info: ['vegetarian', 'vegan'],
              is_available: true,
              calories: 180
            }
          ];
          
          const filteredItems = allMenuItems.filter(item => item.dining_location_id === dining_location_id);
          console.log('Found menu items:', filteredItems.length, 'for location:', dining_location_id);
          console.log('All menu items count:', allMenuItems.length);
          console.log('Sample menu items:', allMenuItems.slice(0, 3));
          return filteredItems;
        }
      },
      Order: {
        list: async () => {
          // Sample orders for testing
          return [
            {
              id: '1',
              order_number: 'UCSC-001',
              user_email: 'student@ucsc.edu',
              items: [
                { name: 'Classic Breakfast Burrito', quantity: 1, price: 7.99 },
                { name: 'Coffee', quantity: 1, price: 2.50 }
              ],
              total_amount: 10.49,
              status: 'preparing',
              delivery_method: 'drone',
              delivery_address: 'Cowell College, Room 101',
              created_date: new Date().toISOString(),
              estimated_time: '15-20 min'
            },
            {
              id: '2', 
              order_number: 'UCSC-002',
              user_email: 'student@ucsc.edu',
              items: [
                { name: 'Grilled Chicken Breast', quantity: 1, price: 8.99 },
                { name: 'Caesar Salad', quantity: 1, price: 5.99 }
              ],
              total_amount: 14.98,
              status: 'in_transit',
              delivery_method: 'drone',
              delivery_address: 'Stevenson College, Room 205',
              created_date: new Date(Date.now() - 300000).toISOString(),
              estimated_time: '5-10 min'
            },
            {
              id: '3',
              order_number: 'UCSC-003', 
              user_email: 'student@ucsc.edu',
              items: [
                { name: 'BBQ Ribs', quantity: 1, price: 11.99 },
                { name: 'Fresh Orange Juice', quantity: 1, price: 3.99 }
              ],
              total_amount: 15.98,
              status: 'delivered',
              delivery_method: 'pickup',
              pickup_location: 'Crown/Merrill Dining Hall',
              created_date: new Date(Date.now() - 1800000).toISOString(),
              estimated_time: 'Delivered'
            }
          ];
        },
        filter: async ({ user_email }) => {
          const orders = await base44.entities.Order.list();
          return orders.filter(order => order.user_email === user_email);
        },
        get: async (orderId) => {
          const orders = await base44.entities.Order.list();
          return orders.find(order => order.id === orderId);
        },
        create: async (orderData) => {
          console.log('Creating order:', orderData);
          // Simulate API call
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve({ id: Date.now().toString(), ...orderData });
            }, 1000);
          });
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
