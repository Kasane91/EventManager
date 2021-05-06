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

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    events: {
      type: new GraphQLNonNull(GraphQLList(EventType)),
      async resolve() {
        try {
          const foundEvents = await Event.find().populate({
            path: "creator",
            populate: { path: "createdEvents" },
          });

          return foundEvents;
        } catch (err) {
          throw new err();
        }
      },
    },
    user: {
      type: GraphQLList(UserType),
      async resolve() {
        try {
          const foundUsers = await User.find().populate({
            path: "createdEvents",
            populate: { path: "creator" },
          });

          return foundUsers;
        } catch (err) {
          throw new err();
        }
      },
    },
  }),
});

module.exports = RootQuery;
