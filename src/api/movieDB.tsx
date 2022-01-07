// Centralized API to Movie DB

import axios from 'axios'

const movieDb = axios.create( { 
    baseURL: 'https://api.themoviedb.org/3/movie',
    params: {
      api_key: '4545ebcbcec4f42045f58f080ec0ba6a',
      language: 'en-US',
    }}
)

export default movieDb