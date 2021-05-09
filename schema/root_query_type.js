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

const {
  user,
  findEvent,
  transformBooking,
  transformEvent,
  events,
} = require("../utils/recursionUtil");

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
          return foundBookings.map(transformBooking);
        } catch (err) {
          throw new err();
        }
      },
    },
  }),
});

module.exports = RootQuery;
