const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/User');
const Location = require('../models/Location');
const Event = require('../models/Event');
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');

const NUM_SEED_USERS = 10;
const NUM_SEED_EVENTS = 30;

// Create users
const users = [];
const schools = [
  "App Academy",
  "NYU",
  "Columbia"
]
const majors = [
  "Comp Sci",
  "Biology",
  "Chemistry",
  "Business",
  "Math"
];

// demo user
users.push(
  new User ({
    username: 'demo-user',
    email: 'demo-user@appacademy.io',
    hashedPassword: bcrypt.hashSync('starwars', 10),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    school: schools[Math.floor(Math.random()*schools.length)],
    major: majors[Math.floor(Math.random()*majors.length)]
  })
)

// random users
for (let i = 1; i < NUM_SEED_USERS; i++) {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  users.push(
    new User ({
      username: faker.internet.userName(firstName, lastName),
      email: faker.internet.email(firstName, lastName),
      hashedPassword: bcrypt.hashSync(faker.internet.password(), 10),
      firstName: firstName,
      lastName: lastName,
      school: schools[Math.floor(Math.random()*schools.length)],
      major: majors[Math.floor(Math.random()*majors.length)]
    })
  )
}

// Create locations
const locations = [];
const locationData = [
  {
    name: "Andrew Heiskell Braille and Talking Book Library",
    imageUrl: "https://lh5.googleusercontent.com/p/AF1QipNIvkPF5UwRweK1garG9eQiKvNvncY7pmsCA8Vf=w408-h306-k-no",
    latitude: 40.741778380340875, 
    longitude: -73.9930608400538
  },
  {
    name: "Epiphany Library",
    imageUrl: "https://lh5.googleusercontent.com/p/AF1QipOsJ2-LZz1S-ajWg3tN5Sm9dWk-MqCNyfXGLOku=w408-h306-k-no",
    latitude: 40.738982015961504, 
    longitude: -73.98216034289288
  },
  {
    name: "Ottendorfer Library",
    imageUrl: "https://lh5.googleusercontent.com/p/AF1QipM19EPD2Bx9CLZ0YkWQLUEYDf4drxMkXDp8-GKy=w408-h270-k-no",
    latitude: 40.729226336363915, 
    longitude: -73.98782516802406
  },
  {
    name: "Seward Park Library",
    imageUrl: "https://lh5.googleusercontent.com/p/AF1QipMO5emKizopnNp2N_KGQlCqvuYwjgEVi4XsBmQ3=w408-h544-k-no",
    latitude: 40.71465519155157, 
    longitude: -73.98834015261731
  },
  {
    name: "Chatham Square Library",
    imageUrl: "https://lh5.googleusercontent.com/p/AF1QipMtiTtlG0b2jG7MIvkeO24jx7Q3zMRrFxQkLJKe=w408-h481-k-no",
    latitude: 40.71413473453696, 
    longitude: -73.99666572894645
  },
]

locationData.forEach(loc => locations.push(new Location(loc)));

// Create events
const events = [];
const timeSlotMinutes = [30, 45, 60, 90, 120];
for (let i = 0; i < NUM_SEED_EVENTS; i++) {
  const startTime = faker.date.between('2023-05-01T00:00:00.000Z', '2023-05-31T00:00:00.000Z')
  const endTime = new Date(startTime.getTime() + (timeSlotMinutes[Math.floor(Math.random() * timeSlotMinutes.length)])*60000)
  const usersCopy = [...users];
  const creator = usersCopy.splice(Math.floor(Math.random()*usersCopy.length), 1)[0];

  const event = new Event ({
    creator: creator._id,
    name: faker.git.commitMessage(),
    description: faker.lorem.sentence(),
    location: locations[Math.floor(Math.random() * locations.length)]._id,
    startTime: startTime,
    endTime: endTime
  })

  creator.createdEvents.push(event._id);
  
  // making random attendees
  const numRandAttendees = Math.floor(Math.random()*5);
  for (let i = 0; i < numRandAttendees; i++) {
    const attendee = usersCopy.splice(Math.floor(Math.random()*usersCopy.length), 1)[0];
    event.attendees.push(attendee._id);
    attendee.joinedEvents.push(event._id);
  }
  
  // making random requesters
  const numRandRequesters = Math.floor(Math.random()*2);
  for (let i = 0; i < numRandRequesters; i++) {
    const requester = usersCopy.splice(Math.floor(Math.random()*usersCopy.length), 1)[0];
    event.requesters.push(requester._id);
    requester.requestedEvents.push(event._id);
  }

  events.push(event);
}

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB successfully');
    insertSeeds();
  })
  .catch(err => {
    console.error(err.stack);
    process.exit(1);
  });

const insertSeeds = () => {
  console.log("Resetting db and seeding users, locations, events...");

  User.collection.drop()
                  .then(() => Location.collection.drop())
                  .then(() => Event.collection.drop())
                  .then(() => User.insertMany(users))
                  .then(() => Location.insertMany(locations))
                  .then(() => Event.insertMany(events))
                  .then(() => {
                    console.log("Done!");
                    mongoose.disconnect();
                  })
                  .catch(err => {
                    console.error(err.stack);
                    process.exit(1);
                  });
}