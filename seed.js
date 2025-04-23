import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import User from './src/models/user.model.js';
import Card from './src/models/card.model.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

// Clear existing data
const clearDatabase = async () => {
  try {
    await User.deleteMany({});
    await Card.deleteMany({});
    console.log('Database cleared successfully');
  } catch (error) {
    console.error(`Error clearing database: ${error.message}`);
    process.exit(1);
  }
};

// Create sample users
const createUsers = async () => {
  // Hash passwords
  const salt = await bcrypt.genSalt(10);
  const adminPassword = await bcrypt.hash('Admin123!', salt);
  const regularPassword = await bcrypt.hash('User123!', salt);
  const businessPassword = await bcrypt.hash('Business123!', salt);

  const users = [
    // Admin user
    {
      name: {
        first: 'Admin',
        middle: 'System',
        last: 'User'
      },
      email: 'admin@example.com',
      password: adminPassword,
      phone: '0521234567',
      address: {
        state: 'Tel Aviv',
        street: 'Rothschild',
        city: 'Tel Aviv',
        country: 'Israel',
        houseNumber: '10',
        zip: '6380101'
      },
      image: {
        url: 'https://picsum.photos/200/300',
        alt: 'Admin user profile image'
      },
      isBusiness: false,
      isAdmin: true
    },
    // Regular user
    {
      name: {
        first: 'Regular',
        middle: 'App',
        last: 'User'
      },
      email: 'user@example.com',
      password: regularPassword,
      phone: '0529876543',
      address: {
        state: 'Jerusalem',
        street: 'Jaffa',
        city: 'Jerusalem',
        country: 'Israel',
        houseNumber: '20',
        zip: '9414107'
      },
      image: {
        url: 'https://picsum.photos/200/300',
        alt: 'Regular user profile image'
      },
      isBusiness: false,
      isAdmin: false
    },
    // Business user
    {
      name: {
        first: 'Business',
        middle: 'Card',
        last: 'Owner'
      },
      email: 'business@example.com',
      password: businessPassword,
      phone: '0523456789',
      address: {
        state: 'Haifa',
        street: 'HaNassi',
        city: 'Haifa',
        country: 'Israel',
        houseNumber: '30',
        zip: '3303139'
      },
      image: {
        url: 'https://picsum.photos/200/300',
        alt: 'Business user profile image'
      },
      isBusiness: true,
      isAdmin: false
    }
  ];

  try {
    const createdUsers = await User.create(users);
    console.log('Created ${createdUsers.length} users');
    return createdUsers;
  } catch (error) {
    console.error(`Error creating users: ${error.message}`);
    process.exit(1);
  }
};

// Create business cards
const createCards = async (users) => {
  // Find the business user
  const businessUser = users.find(user => user.isBusiness);
  
  if (!businessUser) {
    console.error('No business user found to create cards');
    return;
  }

  const cards = [
    {
      title: 'Web Development Services',
      subtitle: 'Professional websites and web applications',
      description: 'Full-stack web development services including front-end, back-end, and database design. Specializing in React, Node.js, and MongoDB.',
      phone: '0523456789',
      email: 'webdev@example.com',
      web: 'https://webdev-services.com',
      image: {
        url: 'https://picsum.photos/200/300',
        alt: 'Web development services'
      },
      address: {
        street: 'HaNassi',
        city: 'Haifa',
        country: 'Israel',
        zip: '3303139'
      },
      userId: businessUser._id
    },
    {
      title: 'Mobile App Development',
      subtitle: 'iOS and Android applications',
      description: 'Custom mobile application development for iOS and Android platforms. Using React Native and Flutter frameworks for cross-platform compatibility.',
      phone: '0523456789',
      email: 'mobiledev@example.com',
      web: 'https://mobiledev-services.com',
      image: {
        url: 'https://picsum.photos/200/300',
        alt: 'Mobile app development'
      },
      address: {
        street: 'HaNassi',
        city: 'Haifa',
        country: 'Israel',
        zip: '3303139'
      },
      userId: businessUser._id
    },
    {
      title: 'Digital Marketing Agency',
      subtitle: 'Boost your online presence',
      description: 'Comprehensive digital marketing services including SEO, social media marketing, content creation, and PPC advertising campaigns.',
      phone: '0523456789',
      email: 'marketing@example.com',
      web: 'https://digital-marketing-agency.com',
      image: {
        url: 'https://picsum.photos/200/300',
        alt: 'Digital marketing services'
      },
      address: {
        street: 'HaNassi',
        city: 'Haifa',
        country: 'Israel',
        zip: '3303139'
      },
      userId: businessUser._id
    }
  ];

  try {
    const createdCards = await Card.create(cards);
    console.log(`Created ${createdCards.length} business cards`);
    
    // Update business user with created cards
    const cardIds = createdCards.map(card => card._id);
    await User.findByIdAndUpdate(
      businessUser._id,
      { $push: { createdCards: { $each: cardIds } } }
    );
    
    console.log(`Updated business user with created cards`);
    
    return createdCards;
  } catch (error) {
    console.error(`Error creating cards: ${error.message}`);
    process.exit(1);
  }
};

// Run the seeding process
const seedDatabase = async () => {
  try {
    await connectDB();
    await clearDatabase();
    const users = await createUsers();
    await createCards(users);
    
    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error(`Error seeding database: ${error.message}`);
    process.exit(1);
  }
};

// Execute the seeding function
seedDatabase();