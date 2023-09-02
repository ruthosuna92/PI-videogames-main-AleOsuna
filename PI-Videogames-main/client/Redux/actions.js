import axios from 'axios'
import { GET_ALL, GET_BY_ID, GET_BY_NAME } from './actions-types'

export const getAllGames = () => {
    return async (dispatch) => {
       try {
          const endpoint = 'http://localhost:3002/videogames';
          const response = await axios.get(endpoint)
             return dispatch({
                type: GET_ALL,
                payload: response.data,
             });
       } catch (error) {
          console.log(error);
       }
    }
}

export const getById = (id) => {
   return async (dispatch) => {
      try {
         const endpoint = `http://localhost:3002/videogames/${id}`;
         const response = await axios.get(endpoint)
            return dispatch({
               type: GET_BY_ID,
               payload: response.data,
            });
      } catch (error) {
         console.log(error);
      }
   }
}

export const getByName = (name) => {
   return async (dispatch) => {
      try {
         const endpoint = `http://localhost:3002/videogames?name=${name}`;
         const response = await axios.get(endpoint)
            return dispatch({
               type: GET_BY_NAME,
               payload: response.data,
            });
      } catch (error) {
         console.log(error);
      }
   }
}