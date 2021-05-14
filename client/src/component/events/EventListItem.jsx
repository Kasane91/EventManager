import React from "react";
import NeonButton from "../Buttons/NeonButton";
import styled from "styled-components";

const EventItem = styled.li`
  margin: 1rem 0;

  padding: 1rem;
  border: 1px solid #c6ffc1;
  color: #c6ffc1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  h1 {
    margin: 0;

    font-size: 1.5rem;
  }

  h2 {
    margin: 0;
    font-size: 1rem;
    color: #fffbdf;
  }
`;

const EventListItem = ({
  title,
  price,
  eventId,
  user,
  creator,
  date,
  onDetail,
}) => {
  return (
    <EventItem key={eventId}>
      <div>
        <h1>{title}</h1>
        <h2>
          ${price} - {new Date(date).toLocaleDateString()}
        </h2>
      </div>
      <div>
        {user === creator ? (
          <p>You're the owner of this event</p>
        ) : (
          <NeonButton className="listButton" onClick={() => onDetail(eventId)}>
            View Details
          </NeonButton>
        )}
      </div>
    </EventItem>
  );
};

export default EventListItem;
