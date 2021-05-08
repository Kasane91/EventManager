const { user, findEvent } = require("./recursionUtil");
const { dateToString } = require("./timestamp");

const transformBooking = (booking) => {
  return {
    ...booking._doc,
    createdAt: dateToString(booking._doc.createdAt),
    updatedAt: dateToString(booking._doc.updatedAt),
    user: user(booking._doc.user),
    event: findEvent(booking._doc.event),
  };
};

module.exports = {
  transformBooking,
};
