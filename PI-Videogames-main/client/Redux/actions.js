import axios from 'axios'
import { GET_ALL, GET_BY_ID, GET_BY_NAME, CREATE_VIDEOGAME, NAME_SEARCHED, CLEAN, ERROR_VIDEOGAME, GET_ALL_GENRES, CLEAN_OBJECT, EDIT_GAME, MOUNT, UNMOUNT, DELETE_GAME} from './actions-types'

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
     }
   };
};
export const deleteVideogame = (id) => {
   return async (dispatch) => {
     try {
       const endpoint = `http://localhost:3002/videogames/${id}`;
       const {data} = await axios.delete(endpoint);
       return dispatch({
         type: DELETE_GAME,
         payload: data
       });
     } catch (err) {
      return dispatch({
         type: ERROR_VIDEOGAME,
         payload: await err.response.data
      })
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

export const cleanObject = () => {
   return {
      type: CLEAN_OBJECT,
      payload: {}
   }
}

export const putVideogame = (update) => {
   return async (dispatch) => {
     try {
       const endpoint = `http://localhost:3002/videogames`;
       const {data} = await axios.put(endpoint, update);
       return dispatch({
         type: EDIT_GAME,
         payload: data
       });
     } catch (err) {
      return dispatch({
         type: ERROR_VIDEOGAME,
         payload: await err.response.data
      })
     }
   };
};

export const mountComp = () => {
   return {
      type: MOUNT,
      payload: true
   }
}

export const unmountComp = () => {
   return {
      type: UNMOUNT,
      payload: false
   }
}