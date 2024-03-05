import axios from "axios";

const baseUrl = "https://localhost:7232/api";

const NetworkManager = {
  api_request: async function (URL, data, comp = null) {
    try {
      const response = await axios.post(baseUrl + URL, data);
      console.log("Response:", response.data.data);
    
      if (response.data.data?.message) {
        sendToast(comp, "is-success", response.data?.data?.message);
      } else {
        sendToast(comp, "is-success", response.data?.data?.status);
      }

      return response.data;
    } catch (error) {
      console.error("API Request Error:", error);
      sendToast(comp, "is-danger", error.message);
      let resp = {
        statusCode: error.response ? error.response.status : 502,
        data: error.response ? error.response.data : null,
      };
      console.error("Error:", resp);
      throw resp;
    }
  },
};

const sendToast = (comp, type, message) => {
  comp.$buefy.toast.open({
    message: message,
    type: type,
  });
};

export default NetworkManager;




// const NetworkManager = {
//   api_request: async function(URL, data) {
//     try {
//       console.log(URL, data);
//       console.log(typeof URL, typeof data);
//       const response = await axios.post(baseUrl + URL, data);
//       console.log('Response:', response.data); 
//       return response.data;
//     } catch (error) {
//       console.error("API Request Error:", error);
//       let resp = {
//         statusCode: error.response ? error.response.status : 502,
//         data: error.response ? error.response.data : null
//       };
//       console.error('Error:', resp); 
//       throw resp;
//     }
//   }
// };

// export default NetworkManager;


