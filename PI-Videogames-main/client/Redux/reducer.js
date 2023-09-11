import { GET_ALL, GET_BY_ID, GET_BY_NAME, CREATE_VIDEOGAME, NAME_SEARCHED, CLEAN, ERROR_VIDEOGAME} from "./actions-types"

const initialState = {
    allVideogames: [],
    videogameDetail: {},
    postResponse: '',
    errorResponse: '',
    nameSearched: ''
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
        case CREATE_VIDEOGAME:
            return {
                ...state,
                postResponse: action.payload
            }
        case NAME_SEARCHED:
            return {
                ...state,
                nameSearched: action.payload
            }
        case CLEAN:
            return {
                ...state,
                postResponse: action.payload,
                errorResponse: action.payload
            }
        case ERROR_VIDEOGAME:
            return {
                ...state,
                errorResponse: action.payload
            }
        default:
            return { ...state }
    }
}
export default reducer