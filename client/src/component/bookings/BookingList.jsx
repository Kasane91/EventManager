import React from "react";
import styled from "styled-components";
import BookingListItem from "./BookingListItem";

const BookingUL = styled.ul`
  margin: 0 auto;
  padding: 0;
`;

const BookingList = ({ bookings, onCancel }) => {
  const renderBookings = bookings.map((booking) => {
    return (
      <BookingListItem
        key={booking._id}
        event={booking.event}
        id={booking._id}
        user={booking.user._id}
        createdAt={booking.createdAt}
        onCancel={onCancel}
      />
    );
  });

  return <BookingUL>{renderBookings}</BookingUL>;
};

export default BookingList;
