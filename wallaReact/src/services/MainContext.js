import React from "react";

const MainContext = React.createContext({
  email: "",
  token: "",
  name: "",
  url: "http://localhost:8080/public/ads"
});

export default MainContext;