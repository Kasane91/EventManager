import React from "react";
import styled from "styled-components";
import NeonButton from "../Buttons/NeonButton";

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #c6ffc1;
  padding: 0.5rem;
  margin: 1rem auto;
  width: 50rem;

  .info {
    display: flex;
    flex-direction: column;
  }
  div {
    display: flex;
    margin: 0 1rem;
    flex-direction: column;
    justify-content: flex-start;
  }
`;

const BookingListItem = ({ id, user, event, createdAt, onCancel }) => {
  return (
    <ListItem key={id}>
      <div className="info">
        <h1>{event.title}</h1>

        <p>Booked at: {new Date(createdAt).toLocaleDateString()}</p>
      </div>
      <div>
        <p>When: {new Date(event.date).toLocaleDateString()}</p>
        <NeonButton
          onClick={() => {
            onCancel(id);
          }}
        >
          CANCEL
        </NeonButton>
      </div>
    </ListItem>
  );
};

export default BookingListItem;
