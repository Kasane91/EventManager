const {
  transformEvent,
  findEvent,
  transformBooking,
} = require("../utils/recursionUtil");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLFloat,
  GraphQLID,
  GraphQLNonNull,
} = require("graphql");
const { EventType, UserType, BookingType, AuthType } = require("./types");

const { model, Error } = require("mongoose");
const User = model("User");
const Event = model("Event");
const Booking = model("Booking");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const { json } = require("express");
const SECRET_KEY = process.env.SECRET_KEY;

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
      async resolve(
        parentValue,
        { title, description, price, date },
        { isAuth, userId }
      ) {
        console.log(isAuth);
        console.log(date);
        if (!isAuth) {
          throw new Error("User not authenticated");
        }
        try {
          const event = await new Event({
            title,
            description,
            price,
            creator: userId,
          });
          const user = await User.findById(userId);

          if (!user) {
            throw new Error("User does not exist lol");
          }

          await user.createdEvents.push(event);
          await user.save();
          await event.save();
          return transformEvent(event);
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
    loginUser: {
      type: AuthType,
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parentValue, { email, password }, req) {
        console.log(SECRET_KEY);
        const exisitingUser = await User.findOne({ email });
        if (!exisitingUser) {
          throw new Error("User not found");
        }
        try {
          if (await argon2.verify(exisitingUser.password, password)) {
            const jwtToken = await jwt.sign(
              {
                userId: exisitingUser._id,
                email,
              },
              SECRET_KEY,
              {
                expiresIn: "1h",
              }
            );

            return {
              userId: exisitingUser._id,
              token: jwtToken,
              tokenExpiration: 1,
            };
          } else {
            throw new Error("Incorrect password");
          }
        } catch (err) {
          throw new Error(err);
        }
      },
    },
    bookEvent: {
      type: BookingType,
      args: {
        eventId: { type: new GraphQLNonNull(GraphQLID) },
        userId: { type: GraphQLID },
      },
      async resolve(parentValue, { eventId, userId }, req) {
        if (!req.isAuth) {
          throw new Error("Unauthorized");
        }
        const fetchedEvent = await Event.findOne({ _id: eventId });

        const booking = new Booking({
          user: req.userId,
          event: fetchedEvent,
        });

        const result = await booking.save();

        return transformBooking(result);
      },
    },
    cancelBooking: {
      type: EventType,
      args: {
        bookingId: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(parentValue, { bookingId }, { isAuth, userId }) {
        if (!isAuth) {
          throw new Error("Unauthorized");
        }
        try {
          const booking = await Booking.findById(bookingId).populate("event");
          const event = await findEvent(booking._doc.event._id);

          await Booking.deleteOne({ _id: bookingId });
          return event;
        } catch (err) {
          throw new err();
        }
      },
    },
  },
});

module.exports = mutation;
