import React from "react";
import styled from "styled-components";

const ModalDiv = styled.div`
  z-index: 10;

  width: 90%;
  background: #fffbdf;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  position: absolute;
  top: 18vh;
  left: 5%;
  border: 1px solid #334443;
  border-radius: 5px;
  @media (min-width: 768px) {
    width: 50%;
    left: 25%;
  }

  .modal_header {
    padding: 0.5rem;
    padding-left: 1rem;
    background: #334443;

    color: #fffbdf;
  }
  h1 {
    margin: 0;
    font-size: 1.25rem;
  }

  .modal_content {
    padding: 1rem;
  }
  .modal_actions {
    display: flex;
    justify-content: flex-end;
    padding: 1rem;
  }
  button {
    padding: 0.25rem 1rem;
    margin-right: 1rem;
    border-radius: 5px;
    background: #334443;
    color: #fffbdf;
    cursor: pointer;
  }

  button:hover {
    background: #fffbdf;
    color: #334443;
    border: 2px solid #334443;
  }
`;

const Modal = (props) => {
  const onCancel = () => {
    props.clicked();
  };
  const onConfirm = () => {
    console.log("clicked");
    props.onConfirm();
  };
  const onBook = () => {
    props.onBook();
  };
  return (
    <ModalDiv>
      <header className="modal_header">
        <h1>{props.title}</h1>
      </header>
      <section className="modal_content">{props.children}</section>
      <section className="modal_actions">
        {props.canCancel && <button onClick={onCancel}>Cancel</button>}
        {props.canConfirm && <button onClick={onConfirm}>Confirm</button>}
        {props.canBook && props.auth ? (
          <button onClick={onBook}>Book</button>
        ) : (
          <button onClick={onCancel}>Confirm</button>
        )}
      </section>
    </ModalDiv>
  );
};

export default Modal;
