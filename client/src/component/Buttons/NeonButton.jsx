import styled from "styled-components";

const RootColor = {
  neon: "#c6ffc1",
  bg: "hsl(323 21% 16%)",
};

const neonButton = styled.button`
  position: relative;
  font-family: "Cabin", cursive;
  background-color: inherit;

  cursor: pointer;
  text-decoration: none;
  font-size: 1.5rem;
  color: ${RootColor.neon};
  border: ${RootColor.neon} 0.125em solid;
  padding: 0.25em 1em;
  border-radius: 0.25em;

  text-shadow: 0 0 0.8em ${RootColor.neon}, 0 0 0.45em rgba(255, 255, 255, 0.6);

  box-shadow: 0 0 0.7em 0 ${RootColor.neon}, inset 0 0 0.4em 0 ${RootColor.neon};

  &::before {
    content: "";
    position: absolute;
    background: ${RootColor.neon};
    top: 120%;
    left: 0;
    width: 100%;
    height: 100%;

    transform: perspective(1.1em) rotateX(45deg) scale(1, 0.45);
    filter: blur(2em);
    opacity: 0.4;
  }
  &:hover {
    text-shadow: 0 0 1em 0.5em ${RootColor.neon};
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: none;
    box-shadow: 0 0 1em 0.5em ${RootColor.neon},
      inset 0 0 1em 0.5em ${RootColor.neon};

    opacity: 0.2;
  }
  &:hover::after {
    opacity: 0.5;
  }
  &.listButton {
    font-size: 1.6rem;
    padding: 0.2em 1.4em;
  }
`;

export default neonButton;
