const API_URL = "http://localhost:3001/apiv1";
// const ALL_ADVERTS = API_URL + "/anuncios";
const TAGS = API_URL + "/tags";

const todo = "http://localhost:8080/public/ads";
const log =
  "http://localhost:8080/auth/login?email=pepe@pepe.es&pass=pepexxxxx";
// const ADVERT = "http://localhost:8080";
// const ADVERT2 = API_URL + "/anuncios";
// const TAGS2 = API_URL + "/tags";

const data = {
  method: "GET",
  headers: {
    Accept: "application/json, text/plain, */*"
  }
};

const api = () => {
  return {
    searchAll: async () => {
      try {
        const response = await fetch(todo, data);

        if (!response.ok) {
          throw new Error("Error fetching searchAll");
        }

        const dataDetails = response.json();

        return dataDetails;
      } catch (err) {
        console.log("error searchAll: " + err);
        throw err;
      }
    },

    login: async (email, pass) => {
      try {
        const loginUrl = "http://localhost:8080/auth/login";
        // const email = "pepe@pepe.es";
        // const pass = "pepexxxxx";

        // const dataPostLogin = {
        //   method: "POST",
        //   headers: {
        //     Accept: "application/json, text/plain, */*"
        //   },
        //   body: {
        //     email: "pepe@pepe.es",
        //     pass: "pepexxxxx"
        //   }
        // };

        // console.log(dataPostLogin);

        

        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        let urlencoded = new URLSearchParams();
        urlencoded.append("email", email);
        urlencoded.append("pass", pass);

        let requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: urlencoded,
          redirect: "follow"
        };

        const response = await fetch(loginUrl, requestOptions);

        if (!response.ok) {
          throw new Error("Error fetching searchAll");
        }

        const { success, regsNumber, result } = await response.json();
        // const dataDetails = await response.json();

        console.log("datadetail= " + success);
        console.log("datadetail= " + regsNumber);
        console.log("datadetail= " + result);
        return result;
      } catch (err) {
        console.log("error searchAll: " + err);
        throw err;
      }
    },

    searchFiltered: async ({ filter }) => {
      try {
        const response = await fetch(`${todo}?${filter}`, data);

        if (!response.ok) {
          throw new Error("Error fetching searchAll");
        }

        const dataDetails = response.json();

        return dataDetails;
      } catch (err) {
        console.log("error searchFiltered: " + err);
        throw err;
      }
    },

    searchAdvert: async id => {
      try {
        // const response = await fetch(`${todo}/${id}`, data)
        const response = await fetch(
          `http://localhost:8080/public/ads/${id}`,
          data
        );

        // const dataDetails=null;

        // fetch(`${todo}/${id}`, data)
        //   .then(response => response.json())
        //   .then(results => dataDetails = results)
        //   .catch(error =>  error );

        console.log(`${todo}/${id}`);

        if (!response.ok) {
          throw new Error("Error fetching searchAdvert");
        }

        const dataDetails = await response.json();

        console.log(dataDetails);
        return dataDetails;
      } catch (err) {
        console.log("error searchAdvert: " + err);
        throw err;
      }
    },

    searchTags: async () => {
      try {
        const response = await fetch(TAGS, data);

        if (!response.ok) {
          throw new Error("Error fetching searchTags");
        }

        const dataDetails = response.json();

        return dataDetails;
      } catch (err) {
        console.log("error searchTags: " + err);
        throw err;
      }
    }
  };
};

export default api;
