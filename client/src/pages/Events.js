import React, { useState, useRef, useContext, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
  EventControlDiv,
  EventForm,
} from "../component/events/eventFormComponents";
import EventList from "../component/events/EventList";
import { FormControlDiv } from "../../src/pages/Auth";
import Modal from "../component/modal/modal";
import Backdrop from "../component/backdrop/backdrop";
import NeonButton from "../component/Buttons/NeonButton";
import {
  ADD_EVENT,
  GET_EVENTS,
  BOOK_EVENT,
  GET_BOOKINGS,
} from "../graphql/queries/queries";
import Spinner from "../component/UI/Spinner";

import authContext from "../context/auth-context";

const Events = () => {
  //graphQL mutations/queries
  const ContextAuth = useContext(authContext);
  const [addEvent, testdata] = useMutation(ADD_EVENT);
  const [bookEvent] = useMutation(BOOK_EVENT);
  const { loading, error, data } = useQuery(GET_EVENTS, {
    onCompleted: (data) => {
      setActiveEvents(data.events);
    },
  });

  //reactHooks
  const [creating, setCreating] = useState(false);
  const [activeEvents, setActiveEvents] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    return () => {
      setActiveEvents(null);
      setCreating(null);
      setSelectedEvent(null);
    };
  }, []);
  //useRefs
  const titleEl = useRef(null);
  const priceEl = useRef(null);
  const dateEl = useRef(null);
  const descriptionEl = useRef(null);

  const onBookEvent = async () => {
    const eventId = await selectedEvent._id;
    if (!eventId) {
      return;
    }
    if (!ContextAuth.token) {
      setSelectedEvent(null);
      return;
    }
    const result = await bookEvent({
      variables: {
        eventId,
      },
    });
    console.log(result);

    setSelectedEvent(null);
  };

  const createEvent = async () => {
    const title = await titleEl.current.value;
    const date = await dateEl.current.value;
    const description = await descriptionEl.current.value;
    const price = await priceEl.current.value;
    const validationArray = [title, date, description, price];
    try {
      let validate = false;
      await validationArray.forEach((element) => {
        if (element.trim().length === 0) {
          validate = true;
        }
      });
      if (validate) {
        console.log("LOLOLOL");
        return;
      }
      const result = await addEvent({
        variables: {
          title,
          description,
          price: Number(price),
          date: date,
        },
        update: (cache, { data: { createEvent } }) => {
          const { events } = cache.readQuery({ query: GET_EVENTS });
          const updatedEventsArray = [...events, createEvent];
          setActiveEvents(updatedEventsArray);
          cache.writeQuery({
            query: GET_EVENTS,
            data: { events: updatedEventsArray },
          });
        },
      });

      setCreating(false);
    } catch (err) {
      console.log(err);
    }
  };

  const startCreateEvent = () => {
    setCreating(true);
  };

  const cancelCreate = () => {
    setCreating(false);
    setSelectedEvent(null);
  };

  const onViewDetail = async (eventId) => {
    const event = activeEvents.find((event) => event._id === eventId);
    setSelectedEvent(event);
  };
  return (
    <React.Fragment>
      {creating && <Backdrop clicked={cancelCreate} />}
      {creating && (
        <Modal
          title="Add Event"
          canCancel
          canConfirm
          clicked={cancelCreate}
          onConfirm={createEvent}
        >
          <EventForm>
            <FormControlDiv>
              <label htmlFor="title">Title</label>
              <input type="text" id="title" placeholder="Title" ref={titleEl} />
            </FormControlDiv>
            <FormControlDiv>
              <label htmlFor="price">Price</label>
              <input
                type="number"
                id="title"
                placeholder="0.00"
                ref={priceEl}
              />
            </FormControlDiv>
            <FormControlDiv>
              <label htmlFor="date">Date</label>
              <input ref={dateEl} type="datetime-local" id="date" />
            </FormControlDiv>
            <FormControlDiv>
              <label htmlFor="description">Description</label>
              <textarea
                ref={descriptionEl}
                name="description"
                id="description"
                rows="5"
              ></textarea>
            </FormControlDiv>
          </EventForm>
        </Modal>
      )}
      {selectedEvent && <Backdrop clicked={cancelCreate} />}
      {selectedEvent && (
        <Modal
          title="Book Event"
          canCancel
          canBook
          onBook={onBookEvent}
          clicked={cancelCreate}
          auth={ContextAuth.token}
        >
          <h1>{selectedEvent.title}</h1>
          <h4>{selectedEvent.description}</h4>
          <p>
            ${selectedEvent.price} -{" "}
            {new Date(selectedEvent.date).toLocaleDateString()}
          </p>
        </Modal>
      )}
      {ContextAuth.token && (
        <EventControlDiv>
          <NeonButton onClick={startCreateEvent}>CREATE EVENT</NeonButton>
        </EventControlDiv>
      )}

      {!loading && data ? (
        <EventList
          user={ContextAuth.userId}
          events={data.events}
          onDetail={onViewDetail}
        />
      ) : (
        <Spinner />
      )}
    </React.Fragment>
  );
};

export default Events;
