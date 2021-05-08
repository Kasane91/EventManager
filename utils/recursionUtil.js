const mongoose = require("mongoose");
const { model } = mongoose;
const Event = model("Event");
const User = model("User");
const { dateToString } = require("../utils/timestamp");

const transformEvent = (event) => {
  return {
    ...event._doc,
    creator: user(event._doc.creator),
    date: dateToString(event._doc.date),
  };
};

const transformBooking = (booking) => {
  return {
    ...booking._doc,
    createdAt: dateToString(booking._doc.createdAt),
    updatedAt: dateToString(booking._doc.updatedAt),
    user: user(booking._doc.user),
    event: findEvent(booking._doc.event),
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
  transformBooking,
};
