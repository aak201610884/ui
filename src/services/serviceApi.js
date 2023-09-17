// serviceApi.js
import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

const serviceApi = {
  request: async (url, method=" GET", body = null, headers = null) => {
    const config = {
      method,
      url: `${BASE_URL}/${url}`,
      headers,
      data: body,
    };

    try {
      const response = await axios(config);
      return response.data;
    } catch (error) {
      throw error;
    }
  },


};


export default serviceApi;
