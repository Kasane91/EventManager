import React, { useContext } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import AuthContext from "../../context/auth-context";

const MainHeader = styled.header`
  position: fixed;
  border-box
  top: 0;
  left: 0;
  width: 100%;
  height: 3.5rem;
  background: #334443;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #c6ffc1;
  z-index: 2;
`;
const MainNavLogo = styled.div`
  h1 {
    margin: 0;
    font-size: 1.5rem;
    color: #fffbdf;
  }
`;

const MainNavItems = styled.nav`
  margin-right: 3.5rem;

  ul {
    list-style: none;
    display: flex;
    padding: 0;
    justify-content: space-between;
    align-items: center
    margin: 0;
  }
  li {
    margin: 0 1rem;
  }
  a {
    text-decoration: none;
    color: #c6ffc1;
    padding: 0.5rem 1.2rem;
    margin: 0;
  }

  a:active,
  a.active {
    border-radius: 5px;
    background: #fffbdf;
    color: #34656d;
  }
  a:hover {
 
    border-radius: 5px;
    background: #fffbdf;
    color: #34656d;

  }
`;

const MainNavigation = (props) => {
  const ContextAuth = useContext(AuthContext);
  console.log("Context2", ContextAuth);
  return (
    <MainHeader>
      <MainNavLogo>
        <h1>// EasyEvent //</h1>{" "}
      </MainNavLogo>
      <MainNavItems>
        <ul>
          <li>
            <NavLink to="/events">Events</NavLink>
          </li>
          {!ContextAuth.token ? (
            <li>
              <NavLink to="/auth">Authenticate</NavLink>
            </li>
          ) : (
            <React.Fragment>
              <li>
                <NavLink to="/bookings">Bookings</NavLink>
              </li>
              <li>
                <NavLink
                  to="/auth"
                  onClick={() => {
                    ContextAuth.logout();
                  }}
                >
                  Logout
                </NavLink>
              </li>
            </React.Fragment>
          )}
        </ul>
      </MainNavItems>
    </MainHeader>
  );
};

export default MainNavigation;
