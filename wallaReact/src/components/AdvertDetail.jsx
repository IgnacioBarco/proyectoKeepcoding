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
import Advert from "../models/Advert";
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
//         {name} -{photo} -{description} -{sell} -{price} -{author} -{date} -
//         {tags} -{reserved} -{sold} -{chat}
//       </li> */JSON.stringify(data)}


//       <Card style={{ width: "18rem" }}>
//         <Card.Img variant="top" src={data.photo} />
//         <Card.Body>
//           <Card.Title>{data.name}</Card.Title>
//           <Card.Text>
//             {data.description} -{data.sell} -{data.price} -{data.author}
//             -{data.date} -{data.tags} -{data.reserved} -
//             {data.sold} -{data.chat}
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
      id:'',
      success: false,
      regsNumber:0,
      result: []
    };
  }


  

  loadAdvert = async (id) => {
     this.id = this.props.match.params.id;
    // const id = this.props.match.params.id;
    // id = this.props.match.params.id;
    

    console.log('id '+ this.id)
     
    const { success, regsNumber, result } = await searchAdvert(this.id)
    
    
    console.log('result '+result)

    this.setState({ success, regsNumber, result });

  };

  //cargamos los datos del anuncio
  UNSAFE_componentWillMount = (id) => {
    this.loadAdvert(id);
  };

  buildDetailAdvert = () => {
    const advert = this.state.result;
    // const img = "http://localhost:8080/" + advert.photo;

    return (
      <div>
        {/* <li key={_id}>
         {name} -{photo} -{description} -{sell} -{price} -{author} -{date} -
         {tags} -{reserved} -{sold} -{chat}
       </li> */JSON.stringify(advert)}
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={'img'} />
          <Card.Body>
            <Card.Title>{advert.name}</Card.Title>
            <Card.Text>
              {advert._id}
              {advert.description} -{advert.sell} -{advert.price} -{advert.author}
              -{advert.date} -{advert.tags} -{advert.reserved} -
             {advert.sold} -{advert.chat}
              <Link to="/">Back</Link>
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
      </div>
    )
  };

  render() {
    // const id = this.props.match.params.id;
    console.log(this.state);


    return this.state.success === true ? this.buildDetailAdvert() : <div>No hay resultados</div>







  };

}

AdvertDetail.contextType = MainContext;

export default withRouter(AdvertDetail);