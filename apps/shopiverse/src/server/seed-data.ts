import { Product } from './entities/Product';

/**
 * Mock product data for shopiverse
 * Categories: Electronics, Clothing, Books, Home & Garden, Sports, Toys
 */
export const mockProducts: Partial<Product>[] = [
  // Electronics
  {
    id: 'prod-001',
    user_id: 'user-001',
    title: 'Wireless Bluetooth Headphones',
    description:
      'Premium noise-cancelling wireless headphones with 30-hour battery life. Crystal clear sound quality with deep bass and comfortable ear cushions.',
    image: '/images/place-holder.png',
    category: 'Electronics',
    quantity: 50,
    price: 12999 // $129.99
  },
  {
    id: 'prod-002',
    user_id: 'user-001',
    title: 'Smart Watch Pro',
    description:
      'Advanced fitness tracking smartwatch with heart rate monitor, GPS, and sleep tracking. Water-resistant up to 50m.',
    image: '/images/place-holder.png',
    category: 'Electronics',
    quantity: 35,
    price: 29999 // $299.99
  },
  {
    id: 'prod-003',
    user_id: 'user-002',
    title: 'Mechanical Gaming Keyboard',
    description:
      'RGB backlit mechanical keyboard with Cherry MX switches. Programmable keys and anti-ghosting technology.',
    image: '/images/place-holder.png',
    category: 'Electronics',
    quantity: 25,
    price: 8999 // $89.99
  },
  {
    id: 'prod-004',
    user_id: 'user-002',
    title: '4K Webcam',
    description:
      'Ultra HD 4K webcam with auto-focus and built-in microphone. Perfect for streaming and video calls.',
    image: '/images/place-holder.png',
    category: 'Electronics',
    quantity: 40,
    price: 15999 // $159.99
  },

  // Clothing
  {
    id: 'prod-005',
    user_id: 'user-003',
    title: 'Classic Denim Jacket',
    description:
      'Vintage-style denim jacket with distressed finish. 100% cotton, machine washable. Available in multiple sizes.',
    image: '/images/place-holder.png',
    category: 'Clothing',
    quantity: 60,
    price: 7999 // $79.99
  },
  {
    id: 'prod-006',
    user_id: 'user-003',
    title: 'Running Sneakers',
    description:
      'Lightweight running shoes with breathable mesh and responsive cushioning. Ideal for long-distance running.',
    image: '/images/place-holder.png',
    category: 'Clothing',
    quantity: 45,
    price: 9999 // $99.99
  },
  {
    id: 'prod-007',
    user_id: 'user-004',
    title: 'Cotton T-Shirt 3-Pack',
    description:
      'Soft, comfortable cotton t-shirts in classic colors. Pre-shrunk and tagless for maximum comfort.',
    image: '/images/place-holder.png',
    category: 'Clothing',
    quantity: 100,
    price: 2999 // $29.99
  },
  {
    id: 'prod-008',
    user_id: 'user-004',
    title: 'Leather Crossbody Bag',
    description:
      'Genuine leather crossbody bag with adjustable strap and multiple compartments. Elegant and practical.',
    image: '/images/place-holder.png',
    category: 'Clothing',
    quantity: 30,
    price: 12999 // $129.99
  },

  // Books
  {
    id: 'prod-009',
    user_id: 'user-005',
    title: 'The Art of Programming',
    description:
      'Comprehensive guide to modern software development practices. Perfect for beginners and intermediate developers.',
    image: '/images/place-holder.png',
    category: 'Books',
    quantity: 75,
    price: 3999 // $39.99
  },
  {
    id: 'prod-010',
    user_id: 'user-005',
    title: 'Mystery Novel Collection',
    description:
      'Box set of 5 bestselling mystery novels. Over 2000 pages of thrilling stories.',
    image: '/images/place-holder.png',
    category: 'Books',
    quantity: 50,
    price: 4999 // $49.99
  },
  {
    id: 'prod-011',
    user_id: 'user-006',
    title: 'Cookbook: Healthy Eating',
    description:
      '200+ delicious and nutritious recipes for a healthier lifestyle. Includes meal planning guide.',
    image: '/images/place-holder.png',
    category: 'Books',
    quantity: 40,
    price: 2999 // $29.99
  },

  // Home & Garden
  {
    id: 'prod-012',
    user_id: 'user-006',
    title: 'Ceramic Planter Set',
    description:
      'Set of 3 modern ceramic planters with drainage holes. Perfect for succulents and small plants.',
    image: '/images/place-holder.png',
    category: 'Home & Garden',
    quantity: 55,
    price: 3499 // $34.99
  },
  {
    id: 'prod-013',
    user_id: 'user-007',
    title: 'LED String Lights',
    description:
      '33ft waterproof LED string lights with remote control. 8 lighting modes for any occasion.',
    image: '/images/place-holder.png',
    category: 'Home & Garden',
    quantity: 80,
    price: 1999 // $19.99
  },
  {
    id: 'prod-014',
    user_id: 'user-007',
    title: 'Memory Foam Pillow Set',
    description:
      'Set of 2 premium memory foam pillows with cooling gel. Hypoallergenic and machine washable covers.',
    image: '/images/place-holder.png',
    category: 'Home & Garden',
    quantity: 65,
    price: 5999 // $59.99
  },
  {
    id: 'prod-015',
    user_id: 'user-008',
    title: 'Stainless Steel Cookware Set',
    description:
      '10-piece professional cookware set with non-stick coating. Oven safe up to 500°F.',
    image: '/images/place-holder.png',
    category: 'Home & Garden',
    quantity: 20,
    price: 19999 // $199.99
  },

  // Sports
  {
    id: 'prod-016',
    user_id: 'user-008',
    title: 'Yoga Mat with Carrying Strap',
    description:
      'Extra thick yoga mat with non-slip surface. Eco-friendly TPE material, 6mm thickness.',
    image: '/images/place-holder.png',
    category: 'Sports',
    quantity: 70,
    price: 2999 // $29.99
  },
  {
    id: 'prod-017',
    user_id: 'user-009',
    title: 'Adjustable Dumbbells Set',
    description:
      'Space-saving adjustable dumbbells from 5-52.5 lbs. Perfect for home gym workouts.',
    image: '/images/place-holder.png',
    category: 'Sports',
    quantity: 15,
    price: 34999 // $349.99
  },
  {
    id: 'prod-018',
    user_id: 'user-009',
    title: 'Bicycle Helmet',
    description:
      'Lightweight bicycle helmet with adjustable fit system. CPSC certified for safety.',
    image: '/images/place-holder.png',
    category: 'Sports',
    quantity: 45,
    price: 4999 // $49.99
  },

  // Toys
  {
    id: 'prod-019',
    user_id: 'user-010',
    title: 'Building Blocks Set',
    description:
      '1000-piece building blocks set with storage box. Compatible with major brands, ages 6+.',
    image: '/images/place-holder.png',
    category: 'Toys',
    quantity: 85,
    price: 3999 // $39.99
  },
  {
    id: 'prod-020',
    user_id: 'user-010',
    title: 'Remote Control Racing Car',
    description:
      'High-speed RC car with 2.4GHz remote control. Reaches speeds up to 20mph. Ages 8+.',
    image: '/images/place-holder.png',
    category: 'Toys',
    quantity: 40,
    price: 5999 // $59.99
  },
  {
    id: 'prod-021',
    user_id: 'user-001',
    title: 'Educational Science Kit',
    description:
      '50+ science experiments kit for kids. Includes lab tools and instruction manual. Ages 10+.',
    image: '/images/place-holder.png',
    category: 'Toys',
    quantity: 60,
    price: 4499 // $44.99
  },

  // Additional varied products
  {
    id: 'prod-022',
    user_id: 'user-002',
    title: 'Portable Bluetooth Speaker',
    description:
      'Waterproof Bluetooth speaker with 12-hour battery life. 360° surround sound and built-in microphone.',
    image: '/images/place-holder.png',
    category: 'Electronics',
    quantity: 55,
    price: 6999 // $69.99
  },
  {
    id: 'prod-023',
    user_id: 'user-003',
    title: 'Winter Warm Scarf',
    description:
      'Soft cashmere blend scarf in elegant patterns. Lightweight yet warm, perfect for winter.',
    image: '/images/place-holder.png',
    category: 'Clothing',
    quantity: 90,
    price: 2499 // $24.99
  },
  {
    id: 'prod-024',
    user_id: 'user-004',
    title: 'Desktop Organizer',
    description:
      'Bamboo desk organizer with multiple compartments. Eco-friendly and stylish workspace solution.',
    image: '/images/place-holder.png',
    category: 'Home & Garden',
    quantity: 75,
    price: 3299 // $32.99
  },
  {
    id: 'prod-025',
    user_id: 'user-005',
    title: 'Board Game Collection',
    description:
      'Classic board game collection for family game nights. Includes 5 popular games.',
    image: '/images/place-holder.png',
    category: 'Toys',
    quantity: 35,
    price: 5999 // $59.99
  }
];
