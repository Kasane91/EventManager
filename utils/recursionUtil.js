const mongoose = require("mongoose");
const { model } = mongoose;
const Event = model("Event");
const User = model("User");
const Booking = model("Booking");
const { dateToString } = require("../utils/timestamp");

const transformEvent = (event) => {
  return {
    ...event._doc,
    creator: user(event._doc.creator),
    date: dateToString(event._doc.date),
  };
};

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

module.exports = {
  transformEvent,
  user,
  findEvent,
  events,
};
