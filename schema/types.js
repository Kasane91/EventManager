const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
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

const BookingType = new GraphQLObjectType({
  name: "BookingType",
  fields: () => ({
    _id: { type: GraphQLID },
    event: { type: EventType },
    user: { type: UserType },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  }),
});
const AuthType = new GraphQLObjectType({
  name: "AuthData",
  fields: () => ({
    userId: { type: new GraphQLNonNull(GraphQLID) },
    token: { type: GraphQLString },
    tokenExpiration: { type: GraphQLInt },
  }),
});

module.exports = { UserType, EventType, BookingType, AuthType };
