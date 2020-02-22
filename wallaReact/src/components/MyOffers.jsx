import React, { useContext } from "react";
import { Link } from "react-router-dom";
import MainContext from "../services/MainContext";

const MyOffers = props => {
  const context = useContext(MainContext);

  // const URL = "http://localhost:8080/private/users/" + context.name;

  // const [result, setResult] = useState("");
  // let myHeaders = new Headers();
  // myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  // let urlencoded = new URLSearchParams();
  // urlencoded.append("token", context.token);

  // let requestOptions = {
  //   method: "GET",
  //   headers: myHeaders,
  //   body: urlencoded,
  //   redirect: "follow"
  // };

  // fetch(URL, requestOptions)
  //   .then(response => response.text())
  //   .then(result => console.log(result))
  //   .catch(error => console.log("error", error));

  // console.log("res " + result);

  return (
    <div>
      {((context.token === "" || context.name === "") && (
        <div>
          Para acceder a esta sección tienes que estar logado
          <br />
          <Link to="/login">Login</Link>
        </div>
      )) ||
        "Mis ofertas"}
    </div>
  );
};
export default MyOffers;
