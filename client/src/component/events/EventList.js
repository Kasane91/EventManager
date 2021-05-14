import React from "react";
import EventListItem from "./EventListItem";
import styled from "styled-components";

const EventsUL = styled.ul`
  width: 45rem;
  max-width: 80%;
  margin: 2rem auto;
  list-style: none;
  padding: 0;
  height: 100vh;
`;

const EventList = (props) => {
  const events = props.events.map((event) => {
    return (
      <EventListItem
        key={event._id}
        eventId={event._id}
        title={event.title}
        price={event.price}
        description={event.description}
        creator={event.creator._id}
        user={props.user}
        date={event.date}
        onDetail={props.onDetail}
      ></EventListItem>
    );
  });

  return <EventsUL>{events}</EventsUL>;
};

export default EventList;
