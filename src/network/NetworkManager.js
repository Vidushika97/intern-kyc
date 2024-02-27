import axios from "axios";

const baseUrl = 'https://localhost:7232/api';

const NetworkManager = {
  api_request: async function(URL, data) {
    try {
      const response = await axios.post(baseUrl + URL, data);
      console.log('Response:', response.data); 
      return response.data;
    } catch (error) {
      console.error("API Request Error:", error);
      let resp = {
        statusCode: error.response ? error.response.status : 502,
        data: error.response ? error.response.data : null
      };
      console.error('Error:', resp); 
      throw resp;
    }
  }
};

export default NetworkManager;

