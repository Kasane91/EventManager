import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useMutation, useQuery } from "@apollo/client";
import { GET_BOOKINGS, CANCEL_BOOKING } from "../graphql/queries/queries";
import Spinner from "../component/UI/Spinner";
import BookingList from "../component/bookings/BookingList";

const BookingContainer = styled.div`
  margin: 1rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  color: #c6ffc1;
  .title {
    font-size: 2.5rem;
  }
`;

const Bookings = () => {
  const [cancelBooking] = useMutation(CANCEL_BOOKING);

  const { loading, error, data } = useQuery(GET_BOOKINGS, {
    fetchPolicy: "cache-and-network",
  });

  const onCancel = (bookingId) => {
    console.log("bookingId", bookingId);
    cancelBooking({
      variables: {
        bookingId,
      },

      update: (cache) => {
        const { bookings } = cache.readQuery({ query: GET_BOOKINGS });

        const updatedBookingsArray = bookings.filter(
          (booking) => booking._id !== bookingId
        );

        cache.writeQuery({
          query: GET_BOOKINGS,
          data: { bookings: updatedBookingsArray },
        });
      },
    });
  };

  return (
    <BookingContainer>
      {" "}
      <h1 className="title">Booking Page</h1>
      {!loading && data ? (
        <BookingList bookings={data.bookings} onCancel={onCancel} />
      ) : (
        <Spinner />
      )}
    </BookingContainer>
  );
};

export default Bookings;
