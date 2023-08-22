const userNames = [
  'Jake',
  'Logan',
  'Ariana',
  'Selena',
  'Eric',
  'Aidan',
  'Chris',
  'Zach',
  'Colin',
  'Sam',
  'Justin',
  'Alex',
];

const thoughtTexts = [
  "Here's a cool thought.",
  "I'm thinking about something.",
  "Just a random thought.",
  "Reflecting on the day.",
  "Dreaming big.",
  "Contemplating life's mysteries.",
  "Wondering about the universe.",
  "Exploring new ideas.",
];

const randomItem = (item) => item[Math.floor(Math.random() * item.length)];

const getRandomUserName = () =>
  `${randomItem(userNames)} ${randomItem(userNames)}`;

const getRandomThoughtText = () => randomItem(thoughtTexts);

module.exports = { getRandomUserName, getRandomThoughtText };
