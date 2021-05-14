import { createContext } from "react";

const AuthContext = createContext({
  userId: null,
  userName: "",
  token: null,
  logIn: () => {},
  logOut: () => {},
});

export default AuthContext;
