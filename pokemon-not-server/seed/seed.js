const mongoose = require('mongoose');
const Book = require('../models/Books'); // Assuming you have a Book model defined
const db = require('../config/connection');

// Step 2: Read the seed data from the JSON file
const seedData = require('./seedData.json');

// Step 3: Seed the data into the database
async function seedDatabase() {
  try {
    // Establish the database connection
    await db.once('open', async () => {
      console.log('Connected to the database.');
      // Seed the data into the database
      await Book.insertMany(seedData);
      console.log('Database seeded successfully.');
      // Close the database connection after seeding
      db.close();
      console.log('Database connection closed.');
    });
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

// Call the seedDatabase function to seed the data
seedDatabase();