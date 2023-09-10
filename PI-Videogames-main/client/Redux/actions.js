import axios from 'axios'
import { GET_ALL, GET_BY_ID, GET_BY_NAME, CREATE_VIDEOGAME, NAME_SEARCHED} from './actions-types'

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
         console.log(response.data);
         if(!id) return dispatch({type: GET_BY_ID, payload:{}})
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

export const postVideogame = (videogame) => {
   return async (dispatch) => {
     try {
       const endpoint = `http://localhost:3002/videogames`;
       const {data} = await axios.post(endpoint, videogame);
       return dispatch({
         type: CREATE_VIDEOGAME,
         payload: data
       });
     } catch (err) {
       console.log(err);
     }
   };

};

export const nameSearched = (name) => {
   return {
      type: NAME_SEARCHED,
      payload: name
   }
}

