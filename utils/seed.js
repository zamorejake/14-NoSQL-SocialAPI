const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomUserName, getRandomThoughtText } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('Connected to the database');

  // reset previous
  await Promise.all([User.deleteMany(), Thought.deleteMany()]);

  const users = [];
  const thoughts = [];

  for (let i = 0; i < 15; i++) {
    const username = getRandomUserName();
    const email = `${username.toLowerCase().replace(' ', '')}@example.com`;

    const user = {
      username,
      email,
      thoughts: [],
      friends: [],
    };

    const thoughtText = getRandomThoughtText();

    const thought = {
      thoughtText,
      username,
    };

    users.push(user);
    thoughts.push(thought);
  }

  const insertedUsers = await User.insertMany(users);

  for (const thought of thoughts) {
    const userIndex = Math.floor(Math.random() * insertedUsers.length);
    const user = insertedUsers[userIndex];
    thought.userId = user._id;
    user.thoughts.push(thought._id);
  }

  await Thought.insertMany(thoughts);

  console.info('Seeding complete! 🌱');
  process.exit(0);
});