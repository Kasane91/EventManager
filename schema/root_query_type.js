const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLNonNull,
} = require("graphql");
const mongoose = require("mongoose");
const { model } = mongoose;
const Event = model("Event");
const User = model("User");
const Booking = model("Booking");
const { EventType, UserType, BookingType } = require("./types");
const { dateToString } = require("../utils/timestamp");

const transformEvent = (event) => {
  return {
    ...event._doc,
    creator: user(event._doc.creator),
    date: dateToString(event._doc.date),
  };
};

//fetches a user based on ID, and removes password
const user = async (userId) => {
  try {
    const user = await User.findById(userId);
    return { ...user._doc, createdEvents: events(user._doc.createdEvents) };
  } catch (err) {
    throw new err();
  }
};

const findEvent = async (eventId) => {
  try {
    const foundEvent = await Event.findOne({ _id: eventId });

    return transformEvent(foundEvent);
  } catch (err) {
    throw new err();
  }
};

const events = async (eventIds) => {
  try {
    const foundEvents = await Event.find({ _id: { $in: eventIds } });

    return foundEvents;
  } catch (err) {
    throw new err();
  }
};

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    events: {
      type: new GraphQLNonNull(GraphQLList(EventType)),
      async resolve() {
        try {
          const events = await Event.find();

          return events.map(transformEvent);
        } catch (err) {
          throw new err();
        }
      },
    },

    user: {
      type: GraphQLList(UserType),
      async resolve() {
        // Easy way
        // const foundUsers = await User.find().populate({
        //   path: "createdEvents",
        //   populate: { path: "creator" },
        // });

        // return foundUsers;
        try {
          const foundUsers = await User.find();

          const foundUsersProcessed = await foundUsers.map((user) => {
            return {
              ...user._doc,
              password: null,
              createdEvents: events(user._doc.createdEvents),
            };
          });

          return foundUsersProcessed;
        } catch (err) {
          throw new err();
        }
      },
    },
    bookings: {
      type: new GraphQLList(BookingType),
      async resolve() {
        try {
          const foundBookings = await Booking.find();

          return foundBookings.map((booking) => {
            return {
              ...booking._doc,

              //helper method?
              createdAt: dateToString(booking._doc.createdAt),
              updatedAt: dateToString(booking._doc.updatedAt),
              user: user(booking._doc.user),
              event: findEvent(booking._doc.event),
            };
          });
        } catch (err) {
          throw new err();
        }
      },
    },
  }),
});

module.exports = { RootQuery, user, findEvent, transformEvent };
