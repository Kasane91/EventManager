const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLNonNull,
  GraphQLFloat,
  GraphQLList,
} = require("graphql");

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

const UserType = new GraphQLObjectType({
  name: "UserType",
  fields: () => ({
    _id: { type: GraphQLID },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: GraphQLString },
    createdEvents: { type: GraphQLList(EventType) },
  }),
});

module.exports = { UserType, EventType };
