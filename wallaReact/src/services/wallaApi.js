const API_URL = "http://18.222.10.183:8080";
const TAGS = API_URL + "/tags";

const todo = "http://18.222.10.183:8080/public/ads";

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
        const loginUrl = "http://18.222.10.183:8080/auth/login";

        let myHeaders = new Headers();
        myHeaders.append("Accept", "application/json, text/plain, */*");

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
        console.log("datadetail= " + success);
        return { regsNumber, result };
      } catch (err) {
        throw err;
      }
    },

    newUser: async (name, email, pass) => {
      try {
        const loginUrl = "http://18.222.10.183:8080/auth/login";

        let myHeaders = new Headers();
        myHeaders.append("Accept", "application/json, text/plain, */*");

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

        console.log(response);

        if (!response.ok) {
          throw new Error("Error fetching searchAll");
        }

        const { success, regsNumber, result } = await response.json();
        // const dataDetails = await response.json();

        console.log("datadetail= " + success);
        // console.log("datadetail= " + regsNumber);
        console.log("datadetail= " + result);
        return { regsNumber, result };
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
        const response = await fetch(
          `http://18.222.10.183:8080/public/ads/${id}`,
          data
        );

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
