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
  "NYU",
  "Columbia",
  "Stonybrook"
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
    username: '1337 C0d3r',
    email: 'mongobara@appacademy.edu',
    hashedPassword: bcrypt.hashSync('password', 10),
    firstName: 'Amiter',
    lastName: 'DiSmietho',
    school: "App Academy",
    major: "Kahoot"
  })
)

// random users
for (let i = 1; i < NUM_SEED_USERS; i++) {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const school = schools[Math.floor(Math.random()*schools.length)];
  users.push(
    new User ({
      username: faker.internet.userName(firstName, lastName),
      email: faker.internet.email(firstName, lastName, `${school}.edu`),
      hashedPassword: bcrypt.hashSync(faker.internet.password(), 10),
      firstName: firstName,
      lastName: lastName,
      school: school,
      major: majors[Math.floor(Math.random()*majors.length)]
    })
  )
}

// Create locations
const locations = [];
const locationData = [
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
  {
    name: "Kips Bay Library",
    latitude: 40.745042011615695,
    longitude: -73.97992193841986
  },
  {
    name: "Battery Park City Library",
    latitude: 40.7165388289107,
    longitude: -74.01559101609772
  },
  {
    name: "Tompkins Square Library",
    latitude: 40.72734177701872,
    longitude: -73.98039817443512
  },
  {
    name: "Hamilton Fish Park Library",
    latitude: 40.72045921941025,
    longitude: -73.9794761693269
  }, 
  {
    name: "Andrew Heiskell Braille and Talking Book Library",
    latitude: 40.74099110899836,
    longitude: -73.99043085753692
  },
  {
    name: "Epiphany Library",
    latitude: 40.73882452808173,
    longitude: -73.98195297003078
  },
  {
    name: "Mulberry Street Library",
    latitude: 40.724684064312044,
    longitude: -73.99396141770526
  },
  {
    name: "Jefferson Market Library",
    latitude: 40.73545263981523,
    longitude: -73.99895900866127
  },
  {
    name: "Hudson Park Library",
    latitude: 40.7307185544648,
    longitude: -74.00531001605788
  }, {
    name: "Ottendorfer Library",
    latitude: 40.729649750454314,
    longitude: -73.98764198537313
  }
]

locationData.forEach(loc => locations.push(new Location(loc)));

// Create events
const events = [];
const timeSlotMinutes = [30, 45, 60, 90, 120];
for (let i = 0; i < NUM_SEED_EVENTS; i++) {
  const startTime = faker.date.between('2023-05-01T00:00:00.000Z', '2023-05-10T00:00:00.000Z')
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