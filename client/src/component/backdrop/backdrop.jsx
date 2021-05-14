import React from "react";
import styled from "styled-components";

const BackdropDiv = styled.div`
  z-index: 8;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background: rgba(0, 0, 0, 0.75);
`;

const Backdrop = (props) => {
  return <BackdropDiv onClick={props.clicked}></BackdropDiv>;
};

export default Backdrop;
