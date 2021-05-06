const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLFloat,
  GraphQLID,
  GraphQLNonNull,
} = require("graphql");
const EventType = require("./event");
const UserType = require("./UserType");
const { model } = require("mongoose");
const User = model("User");
const Event = model("Event");
const argon2 = require("argon2");

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createEvent: {
      type: EventType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        _id: { type: GraphQLID },
        description: { type: new GraphQLNonNull(GraphQLString) },
        price: { type: new GraphQLNonNull(GraphQLFloat) },
        date: { type: GraphQLString },
      },
      async resolve(parentValue, { title, description, price }) {
        try {
          const event = await new Event({
            title,
            description,
            price,
            creator: "6093aab3b766d122d47fa3ff",
          });
          const user = await User.findById("6093aab3b766d122d47fa3ff");

          if (!user) {
            throw new Error("User does not exist lol");
          }
          await user.createdEvents.push(event);
          await user.save();

          const savedEvent = await event.save();

          return savedEvent;
        } catch (error) {
          throw error;
        }
      },
    },
    createUser: {
      type: UserType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parentValue, { email, password }) {
        const exisitingUser = await User.findOne({ email });
        if (exisitingUser) {
          throw new Error("User allready exist");
        }
        try {
          const hashedPassword = await argon2.hash(password);
          const user = await new User({
            email,
            password: hashedPassword,
          });
          const res = await user.save();

          return { ...res._doc, password: null };
        } catch (error) {
          throw new error("User could not be created", error);
        }
      },
    },
  },
});

module.exports = mutation;
