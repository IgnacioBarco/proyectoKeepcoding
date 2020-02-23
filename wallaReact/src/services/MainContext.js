import React from "react";

const MainContext = React.createContext({
  email: "",
  token: "",
  name: "",
  url: "http://18.222.10.183:8080/public/ads?sold=false&limit=4",
  adStart: parseInt(0),
});

export default MainContext;