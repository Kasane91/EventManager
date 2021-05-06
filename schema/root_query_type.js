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
const EventType = require("./event");
const UserType = require("./UserType");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    events: {
      type: new GraphQLNonNull(GraphQLList(EventType)),
      async resolve() {
        try {
          const foundEvents = await Event.find();

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
          const foundUsers = await User.find();

          return foundUsers;
        } catch (err) {
          throw new err("error", err);
        }
      },
    },
  }),
});

module.exports = RootQuery;
