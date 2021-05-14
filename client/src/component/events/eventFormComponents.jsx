import styled from "styled-components";

export const EventForm = styled.form`
  width: 70%;
  max-width: 80%;
  margin: 0;
`;

export const EventControlDiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 1.5rem auto;
  padding: 1.5rem;
  width: 70%;
  text-align: center;
  border: 1px solid #c6ffc1;

  p {
    color: #c6ffc1;
  }
`;

export const EventsList = styled.ul`
  width: 40rem;
  max-width: 80%;
  margin: 2rem auto;
  list-style: none;
  padding: 0;
`;

export const EventListItem = styled.li`
  margin: 1rem 0;
  padding: 1px solid black;
`;
