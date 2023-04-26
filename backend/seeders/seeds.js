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
    username: 'JohnDoe',
    email: 'johndoe@nyu.edu',
    hashedPassword: bcrypt.hashSync('password', 10),
    firstName: 'John',
    lastName: 'Doe',
    school: "NYU",
    major: "Computer Science"
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

const locations = [
  {
    name: "Seward Park Library",
    imageUrl: "https://lh5.googleusercontent.com/p/AF1QipMO5emKizopnNp2N_KGQlCqvuYwjgEVi4XsBmQ3=w408-h544-k-no",
    address: "192 East Broadway",
    latitude: 40.714429418660835, 
    longitude: -73.9884788731511
  },
  {
    name: "Chatham Square Library",
    imageUrl: "https://lh5.googleusercontent.com/p/AF1QipMtiTtlG0b2jG7MIvkeO24jx7Q3zMRrFxQkLJKe=w408-h481-k-no",
    address: "33 East Broadway",
    latitude: 40.71344784932242, 
    longitude: -73.99651757627701 
  },
  {
    name: "Kips Bay Library",
    imageUrl: "https://www.literarymanhattan.org/wp-content/uploads/2013/01/kips-bay-flickr-edenpictures.jpg",
    address: "446 3rd Avenue",
    latitude: 40.74382954284475, 
    longitude: -73.97990997386722
  },
  {
    name: "Battery Park City Library",
    imageUrl: "https://images.squarespace-cdn.com/content/v1/6138c9ff84957c54db15deef/1633985467260-2F6JM60HXX1NTKMUT1XZ/nypl-battery-park-city-03-e.jpg",
    address: "175 North End Avenue",
    latitude: 40.71577439929037, 
    longitude: -74.0157083161958
  },
  {
    name: "Tompkins Square Library",
    imageUrl: "https://hdc.org/wp-content/uploads/2013/07/facade-crop.jpg",
    address: "331 East 10th Street",
    latitude: 40.727299110264305, 
    longitude: -73.98039453154054
  },
  {
    name: "Hamilton Fish Park Library",
    imageUrl: "https://1.bp.blogspot.com/-i6gZWTlhGSI/XM7oFFo_JtI/AAAAAAADIOU/MQ0C4i6mG90KY8q3hQT4HjChMKlvqeUHACLcBGAs/s1600/IMG_0506.jpeg",
    address: "415 East Houston Street",
    latitude: 40.72003612652137,
    longitude: -73.97932635852297
  }, 
  {
    name: "Andrew Heiskell Braille and Talking Book Library",
    imageUrl: "https://fastly.4sqi.net/img/general/600x600/16683804_TMBecKXNxrIkdCijwYYjFRE9uurxPinJPAC75qzeQxA.jpg",
    address: "40 West 20th Street #1",
    latitude: 40.740487087209516, 
    longitude: -73.99336014503105
  },
  {
    name: "Epiphany Library",
    imageUrl: "https://s3.amazonaws.com/4urspace_location_images/location_28406/images/4761457b4a43465176835c33ef7809a0_small.JPG",
    address: "228 East 23rd Street",
    latitude: 40.7381253883641, 
    longitude: -73.98204953154007
  },
  {
    name: "Mulberry Street Library",
    imageUrl: "https://www.rogersmarvel.com/projects/NYPL/Rogers-Marvel-NYPL-3.jpg",
    address: "10 Jersey Street",
    latitude: 40.72413926424788, 
    longitude: -73.99559220270434
  },
  {
    name: "Jefferson Market Library",
    imageUrl: "https://www.amny.com/wp-content/uploads/2022/11/TQ-jeffmarket-3329-1200x856.jpg",
    address: "425 6th Avenue",
    latitude: 40.73457461204109, 
    longitude: -73.99908775666819
  },
  {
    name: "Hudson Park Library",
    imageUrl: "https://www.nypl.org/sites-drupal/default/files/styles/max_width_480/public/2020-06/interiorhp_0.jpg?itok=JXp7dJw1",
    address: "66 Leroy Street",
    latitude: 40.730116892279796, 
    longitude: -74.00525637386774
  }, {
    name: "Ottendorfer Library",
    imageUrl: "https://6tocelebrate.org/wp-content/uploads/2015/05/1-Ottendorfer-Library-and-former-German-Dispensary-135-137-Second-Ave-1.jpg",
    address: "135 2nd Avenue",
    latitude: 40.728917992865746, 
    longitude: -73.98768490270409
  }
]

// Create events
const events = [];
const timeSlotMinutes = [30, 45, 60, 90, 120];

for (let j = 0; j < 10; j++) {
  const today = new Date();
  today.setDate(today.getDate() + j - 2);

  const endDay = new Date();
  endDay.setDate(endDay.getDate() + j - 1);
  
  for (let i = 0; i < Math.floor(Math.random() * (10 - 3) + 3); i++) {
    const startTime = faker.date.between(today, endDay);
    const endTime = new Date(startTime.getTime() + (timeSlotMinutes[Math.floor(Math.random() * timeSlotMinutes.length)])*60000)
    const usersCopy = [...users];
    const creator = usersCopy.splice(Math.floor(Math.random()*usersCopy.length), 1)[0];
    let fakerName = faker.name.jobArea();
    let studySessionText = " Study Session";
  
    const event = new Event ({
      creator: creator._id,
      name: fakerName + studySessionText,
      description: faker.lorem.sentence(),
      // location: locations[Math.floor(Math.random()*locations.length)]._id,
      location: locations[Math.floor(Math.random()*locations.length)],
      startTime: startTime,
      endTime: endTime
    })
  
    creator.createdEvents.push(event._id);
    
    // making random attendees
    const numRandAttendees = Math.floor(Math.random() * (5 - 1) + 1);
    for (let i = 0; i < numRandAttendees; i++) {
      const attendee = usersCopy.splice(Math.floor(Math.random()*usersCopy.length), 1)[0];
      event.attendees.push(attendee._id);
      attendee.joinedEvents.push(event._id);
    }
    
    // making random requesters
    const numRandRequesters = Math.floor(Math.random() * (3 - 1) + 1);
    for (let i = 0; i < numRandRequesters; i++) {
      const requester = usersCopy.splice(Math.floor(Math.random()*usersCopy.length), 1)[0];
      event.requesters.push(requester._id);
      requester.requestedEvents.push(event._id);
    }
  
    events.push(event);
  }
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
                  .then(() => Event.collection.drop())
                  .then(() => User.insertMany(users))
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