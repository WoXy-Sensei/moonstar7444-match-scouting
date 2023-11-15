import axios from 'axios'

const api = axios.create({
  headers: {  "Content-Type": "multipart/form-data", }
})

export default api
