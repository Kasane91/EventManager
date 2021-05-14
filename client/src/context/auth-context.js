import React from "react";

export default React.createContext({
  token: null,
  userid: null,
  login: (LoginInfo) => {},
  logout: () => {},
});
