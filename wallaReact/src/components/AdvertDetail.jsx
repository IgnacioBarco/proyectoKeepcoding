import React, {
  Component,
  useState,
  useEffect,
  useContext,
  useReducer
} from "react";
import { Link } from "react-router-dom";
import MainContext from "../services/MainContext";
import locStorage from "../services/LocalStorage";
import api from "../services/wallaApi";
import Anuncio from "../models/Anuncio";
import useFetch from "./useFetch";
import AdvertLine from "./AdvertLine";

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

// const AdvertDetail = (_id) => {
//   const [url, setUrl] = useState("http://localhost:8080/advert/" + _id);
//   const data = useFetch(url);
//   console.log(url)
//   console.log(data)

//   return (
//     <div>
//       {/* <li key={_id}>
//         {nombre} -{foto} -{descripcion} -{venta} -{precio} -{autor} -{fecha} -
//         {tags} -{reservado} -{vendido} -{chat}
//       </li> */JSON.stringify(data)}


//       <Card style={{ width: "18rem" }}>
//         <Card.Img variant="top" src={data.foto} />
//         <Card.Body>
//           <Card.Title>{data.nombre}</Card.Title>
//           <Card.Text>
//             {data.descripcion} -{data.venta} -{data.precio} -{data.autor}
//             -{data.fecha} -{data.tags} -{data.reservado} -
//             {data.vendido} -{data.chat}
//             <Link to="/">Back</Link>
//           </Card.Text>
//           <Button variant="primary">Go somewhere</Button>
//         </Card.Body>
//       </Card>
//     </div>

//   );
// };
// export default AdvertDetail;


import { withRouter } from "react-router-dom";

const { searchAdvert } = api();

class AdvertDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      success: false,
      result: {}
    };
  }


  

  loadAdvert = async () => {
    const id = this.props.match.params.id;

    // 
    const { success, anuncios } = await searchAdvert(id)
    
    let advert = {};
    
    anuncios.map(item =>{
      if (item._id === id) {
        advert = item
  
      }  
    })

    console.log(anuncios)

    this.setState({ success, result: advert });

  };

  //cargamos los datos del anuncio
  UNSAFE_componentWillMount = () => {
    this.loadAdvert();
  };

  buildDetailAdvert = () => {
    const advert = this.state.result;
    // const img = "http://localhost:8080/" + advert.foto;

    return (
      <div>
        {/* <li key={_id}>
         {nombre} -{foto} -{descripcion} -{venta} -{precio} -{autor} -{fecha} -
         {tags} -{reservado} -{vendido} -{chat}
       </li> */JSON.stringify(advert)}
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={'img'} />
          <Card.Body>
            <Card.Title>{advert.nombre}</Card.Title>
            <Card.Text>
              {advert._id}
              {advert.descripcion} -{advert.venta} -{advert.precio} -{advert.autor}
              -{advert.fecha} -{advert.tags} -{advert.reservado} -
             {advert.vendido} -{advert.chat}
              <Link to="/">Back</Link>
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
      </div>
    )
  };

  render() {
    const id = this.props.match.params.id;
    console.log(this.state);


    return this.state.success === true ? this.buildDetailAdvert() : <div>No hay resultados</div>







  };

}

AdvertDetail.contextType = MainContext;

export default withRouter(AdvertDetail);