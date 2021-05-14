import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser($email: String!, $password: String!) {
    createUser(email: $email, password: $password) {
      _id
      email
    }
  }
`;

export const LOGIN = gql`
  mutation LogInUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      userId
      token
      tokenExpiration
    }
  }
`;

export const ADD_EVENT = gql`
  mutation ADD_EVENT($title: String!, $description: String!, $price: Float!) {
    createEvent(title: $title, description: $description, price: $price) {
      title
      _id
      description
      creator {
        _id
      }
    }
  }
`;

export const GET_EVENTS = gql`
  query {
    events {
      title
      description
      price
      date
      _id
      creator {
        _id
      }
    }
  }
`;

export const BOOK_EVENT = gql`
  mutation BOOK_EVENT($eventId: ID!) {
    bookEvent(eventId: $eventId) {
      _id
      user {
        _id
      }
      createdAt
    }
  }
`;

export const GET_BOOKINGS = gql`
  query {
    bookings {
      createdAt
      _id
      event {
        _id
        title
        date
      }
      user {
        _id
      }
    }
  }
`;

export const CANCEL_BOOKING = gql`
  mutation CANCEL_EVENT($bookingId: ID!) {
    cancelBooking(bookingId: $bookingId) {
      _id
      title
      creator {
        _id
      }
    }
  }
`;
