import db from '../config/connection';
import { User } from '../model/index.js';
import cleanDB from './cleanDB.js';
// import { getRandomUsername } from './data.js'; //not sure what random name should be changed to

try {
  await db();
  await cleanDB();

  // Create empty array to hold the users
  const users = [];

  // Loop 20 times -- add users to the users array
  for (let i = 0; i < 20; i++) {
    // Get some random username objects using a helper function that we imported from ./data
    // const username = getRandomUsername();
    users.push({
      // username
    });
  }

  // Add users to the collection and await the results
  const userData = await User.create(users);


  // Log out the seed data to indicate what should appear in the database
  console.table(userData);
  console.info('Seeding complete! 🌱');
  process.exit(0);
} catch (error) {
  console.error('Error seeding database:', error);
  process.exit(1);
}