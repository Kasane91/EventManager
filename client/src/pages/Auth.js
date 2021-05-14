import React, { useRef, useState, useContext } from "react";
import styled from "styled-components";
import { CREATE_USER, LOGIN } from "../graphql/queries/queries";
import AuthContext from "../context/auth-context";

import { useMutation } from "@apollo/client";

const AuthForm = styled.form`
  width: 25rem;
  max-width: 80%;
  margin: 5rem auto;
  button {
    background-color: #334443;
    color: #fff;
    padding: 0.5rem 1rem;
    margin-right: 1rem;
    border-radius: 3px;
    font-family: sans-serif;
    box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.5);
  }
  button:hover,
  button:active {
    background: #34656d;
    color: #c6ffc1;
    cursor: pointer;
  }
`;

const FormControlDiv = styled.div`
  margin-bottom: 1rem;
  label,
  input,
  textarea {
    width: 100%;
    display: block;
  }

  label {
    margin-bottom: 0.5rem;
  }
`;

const Auth = (props) => {
  const [createUser, { createUserData }] = useMutation(CREATE_USER);
  const [loginUser, data] = useMutation(LOGIN);
  const [newUser, setNewUser] = useState(false);
  const ContextAuth = useContext(AuthContext);

  const emailEl = useRef(null);
  const passwordEl = useRef(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    const email = await emailEl.current.value;
    const password = await passwordEl.current.value;

    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }

    if (newUser) {
      try {
        const result = await createUser({
          variables: {
            email,
            password,
          },
        });
        await console.log(result);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const result = await loginUser({
          variables: {
            email,
            password,
          },
        });
        // console.log("Test", result);

        if (result.data.loginUser.token) {
          await ContextAuth.login(result.data.loginUser);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <AuthForm onSubmit={submitHandler}>
      <FormControlDiv>
        <label htmlFor="email">E-MAIL</label>
        <input ref={emailEl} type="email" id="email" name="email" />
      </FormControlDiv>
      <FormControlDiv>
        <label htmlFor="password">Password</label>
        <input ref={passwordEl} type="password" id="password" name="password" />
      </FormControlDiv>
      <div className="form-action">
        <button type="submit">{newUser ? "Sign Up" : "Log in"}</button>
        <button onClick={() => setNewUser(!newUser)} type="button">
          {newUser ? "Switch to Sign-In" : "Switch to Sign-Up"}
        </button>
      </div>
    </AuthForm>
  );
};

export default Auth;
export { AuthForm, FormControlDiv };
