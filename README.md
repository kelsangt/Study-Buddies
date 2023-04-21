# Study Buddies 

# Background and Overview 

Study Buddies is an app that allows students to be able to create and attend study sessions. These study sessions will be held in libraries across America and can be easily organized by the study session creator. Utilizing the Google Maps API, students will be able to browse available study sessions in their area, create study sessions, and request to join existing study sessions. Study Buddies fosters learning by allowing students to build their network and find peers to study with. 

# Functionality and MVP 

## Feature 1 - User Auth 

Users must be able to sign up to create an account. Users must also be able to sign in and out of their account. Must be able to identify current user. 

## Feature 2 - User Profile

Users will have their own profiles where they can add more information about themselves. Users can update their information on their profile. 

## Feature 3 - Google Maps

The Google Maps API will allow the user to browse study sessions around them on the map. 

## Feature 4 - Study Sessions (CRUD)

Users can create, read, update, and destroy study sessions. 
- Create - A user will be able to be the creator of a study session, allowing other users to request to join their session. 
- Read - Users will be able to see study sessions near them. 
- Update - A study session creator will be able to change the details of their study session (date and time, number of people attending, etc). 
- Destroy - A study creator will be able to delete their study session. 

## Feature 5 - Notifications 

Users will be notified when someone has requested to join their study session (if the user is the creator of the session). Users who requested to join a session will be notified if their request was accepted by the session creator. 

## Bonus Features

- Live chat
- User status
- Friends

# Technologies and Technical Challenges

## Technologies that will be implemented:
- MongoDB
- Express
- React and Redux
- Node.js 
- Amazon S3 
- Google Maps API 

# Group Members and Work Breakdown

## Group members:
- Kelsang Tsering - Team Lead 
- Ying Zhou - Frontend Lead
- Fahim Khan - Backend Lead
- Justin Diner - Flex

## Schedule:
Monday (4/16):
- Kelsang: 
    - Work on frontend logic and styling for User Profile feature
- Ying: 
    - Work on frontend logic and styling for User Profile feature
- Fahim
    - Work on backend logic for User Profile feature
- Justin
    - Work on Google Maps API 

Tuesday (4/17):
- Kelsang: 
    - Work on frontend logic and styling for Study Sessions
- Ying: 
    - Work on frontend logic and styling for Study Sessions 
- Fahim
    - Work on backend for Study Sessions
- Justin
    - Finalize Google Maps API logic

Wednesday (4/16):
- Kelsang: 
    - Work on frontend logic and styling for Notifications 
- Ying: 
    - Work on frontend logic and styling for Notifications 
- Fahim
    - Work on backend logic for Notifications
- Justin
    - Work on frontend logic and styling for Notifications + backend 

Thursday (4/16):
- Kelsang: 
    - Work on frontend logic and styling for bonus features if possible 
- Ying: 
    - Work on frontend logic and styling for bonus features if possible 
- Fahim
    - Work on backend logic for bonus features if possible 
- Justin
    - Work on backend logic for bonus features if possible

```javascript
// GET all events
router.get('/', async (req, res) => {
  try {
    const startDay = new Date(req.query.startDate);

    let endDay;
    if (req.query.endDate) {
      endDay = new Date(req.query.endDate);
    } else {
      endDay = new Date(req.query.startDate);
      endDay.setDate(endDay.getDate() + 1);
    }
    
    const events = await Event.find({
      startTime: {
        $gte: startDay,
        $lt: endDay
      }
    })
    .populate("creator", "_id username profileImageUrl")
    .populate("attendees", "_id username profileImageUrl")
    .populate("location", "_id name latitude longitude imageUrl")
    .sort({ startTime: 1 });

    return res.json(events);
  } catch(err) {
    return res.json([]);
  }
});

// DELETE event or DELETE attendance
router.delete('/:id', requireUser, async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);

    if (event.creator.toString() === req.user._id.toString()) {
      // delete event from creator's createdEvents
      await User.updateOne(
        { _id: req.user._id }, 
        { $pullAll: { createdEvents: [event._id] }}
      )
      
      // delete event from each attendees' attendedEvents
      await User.updateMany(
        { _id: { $in: event.attendees } },
        { $pullAll: { attendedEvents: [event._id] }}
      )

      // delete event from each requesters' attendedEvents
      await User.updateMany(
        { _id: { $in: event.requesters } },
        { $pullAll: { requestedEvents: [event._id] }}
      )

      // delete the event itself
      await event.deleteOne();

      return res.json("created deleted");
    } else {
      // delete event from current user's joinedEvents
      await User.findByIdAndUpdate(
        req.user._id,
        { $pullAll: { joinedEvents: [event._id] } }
      )

      await Event.findByIdAndUpdate(
        req.params.id,
        {$pullAll: {attendees: [req.user._id] } }
      )

      return res.json("joined deleted");
    }
  } catch(err) {
    const error = new Error('Event not found');
    error.statusCode = 404;
    error.errors = { message: "No event found with that id" };
    return next(error);
  }
})

// event requests
// UPDATE request status
router.patch('/:id/requests/:userId', requireUser, async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);

    if (event.creator.toString() !== req.user._id.toString()) {
      ...// error handling
    }

    const user = await User.findById(req.params.userId);

    let idx = event.requesters.indexOf(user._id)
    event.requesters.splice(idx, 1);

    idx = user.requestedEvents.indexOf(event._id)
    user.requestedEvents.splice(idx, 1);

    if (req.body.choice === "accept") {
      event.attendees.push(user._id);
      user.joinedEvents.push(event._id);
    }

    await user.save();
    await event.save();

    ...// format updated event for response

    return res.json(updatedEvent);
  } catch(err) {
    ...// error handling
  }
})

// DELETE attendee
router.delete('/:id/attendees/:userId', requireUser, async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (event.creator.toString() !== req.user._id.toString()) {
      ...// error handling
    }

    const user = await User.findById(req.params.userId)

    let idx = event.attendees.indexOf(user._id)
    event.attendees.splice(idx, 1);

    idx = user.joinedEvents.indexOf(event._id)
    user.joinedEvents.splice(idx, 1);

    await user.save();
    await event.save();
    
    ...// format updated event for response

    return res.json(updatedEvent);
  } catch(err) {
    ...// error handling
  }
})
```