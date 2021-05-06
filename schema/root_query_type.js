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
const { EventType, UserType } = require("./types");

//fetches a user based on ID, and removes password
const user = async (userId) => {
  try {
    const foundUser = await User.findById(userId);
    foundUser.password = null;
    return foundUser;
  } catch (err) {
    throw new err();
  }
};

//fetches events created by a singular user. Takes an array of eventId's as input
const events = async (eventIds) => {
  const foundEvents = await Event.find({ _id: { $in: eventIds } });
  const processedEvents = await foundEvents.map((event) => {
    return {
      ...event._doc,
      creator: user(event._doc.creator),
    };
  });

  return processedEvents;
};

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    events: {
      type: new GraphQLNonNull(GraphQLList(EventType)),
      async resolve() {
        try {
          const foundEvents = await Event.find();
          const eventsWithUserInfo = await foundEvents.map((event) => {
            return {
              ...event._doc,
              creator: user(event._doc.creator),
            };
          });

          return eventsWithUserInfo;
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
          foundUsers = await User.find();

          const foundUsersProcessed = foundUsers.map((user) => {
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
  }),
});

module.exports = RootQuery;
