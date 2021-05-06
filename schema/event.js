const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLNonNull,
  GraphQLFloat,
} = require("graphql");
const UserType = require("./UserType");

const EventType = new GraphQLObjectType({
  name: "EventType",
  fields: () => ({
    title: { type: new GraphQLNonNull(GraphQLString) },
    _id: { type: new GraphQLNonNull(GraphQLID) },
    description: { type: new GraphQLNonNull(GraphQLString) },
    price: { type: new GraphQLNonNull(GraphQLFloat) },
    date: { type: new GraphQLNonNull(GraphQLString) },
    creator: { type: UserType },
  }),
});

module.exports = EventType;
