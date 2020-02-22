import React, { useContext } from "react";
import { Link } from "react-router-dom";
import MainContext from "../services/MainContext";

const MyAds = props => {
  const context = useContext(MainContext);

  return (
    <div>
      {((context.token === "" || context.name === "") && (
        <div>
          Para acceder a esta sección tienes que estar logado
          <br />
          <Link to="/login">Login</Link>
        </div>
      )) ||
        "Mis perfil"}
    </div>
  );
};
export default MyAds;
