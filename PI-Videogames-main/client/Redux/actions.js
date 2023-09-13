import axios from 'axios'
import { GET_ALL, GET_BY_ID, GET_BY_NAME, CREATE_VIDEOGAME, NAME_SEARCHED, CLEAN, ERROR_VIDEOGAME, GET_ALL_GENRES} from './actions-types'

export const getAllGenres = () => {
   return async (dispatch) => {
      try {
         const endpoint = 'http://localhost:3002/genres';
         const response = await axios.get(endpoint)
            return dispatch({
               type: GET_ALL_GENRES,
               payload: response.data,
            });
      } catch (error) {
         console.log(error);
      }
   }
}

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
      return dispatch({
         type: ERROR_VIDEOGAME,
         payload: await err.response.data
      })
      // console.log(err.response.data)

      // return async (dispatch) =>{
      //    return dispatch({
      //    type: ERROR_VIDEOGAME,
      //    payload: err.response.data
      //  })}
     }
   };

};

export const nameSearched = (name) => {
   return {
      type: NAME_SEARCHED,
      payload: name
   }
}
export const clean = () => {
   return {
      type: CLEAN,
      payload: ''
   }
}

