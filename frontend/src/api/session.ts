import axios from 'axios'

const api = axios.create({
    timeout: 1000,
    headers: {'accept': 'application/json'}
  });

export default api;