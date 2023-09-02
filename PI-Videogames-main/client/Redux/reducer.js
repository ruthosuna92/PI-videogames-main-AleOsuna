import { GET_ALL, GET_BY_ID, GET_BY_NAME } from "./actions-types"

const initialState = {
    allVideogames: [],
    videogameDetail: {}
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL:
            return {
                ...state,
                allVideogames: action.payload
            }
        case GET_BY_ID:
            return {
                ...state,
                videogameDetail: action.payload
            }
        case GET_BY_NAME:
            return {
                ...state,
                allVideogames: action.payload
            }
        default:
            return { ...state }
    }
}
export default reducer