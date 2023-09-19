import { GET_ALL, GET_BY_ID, GET_BY_NAME, CREATE_VIDEOGAME, NAME_SEARCHED, CLEAN, ERROR_VIDEOGAME, GET_ALL_GENRES, CLEAN_OBJECT, EDIT_GAME, MOUNT, UNMOUNT, DELETE_GAME } from "./actions-types"

const initialState = {
    allVideogames: [],
    allGenres: [],
    videogameDetail: {},
    postResponse: '',
    errorResponse: '',
    nameSearched: '',
    mountOrUnmount: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL:
            return {
                ...state,
                allVideogames: action.payload
            }
        case GET_ALL_GENRES:
            return {
                ...state,
                allGenres: action.payload
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
        case EDIT_GAME:
            return {
                ...state,
                postResponse: action.payload.putResponse,
                videogameDetail: {
                    id: action.payload.id,
                    name: action.payload.name,
                    background_image: action.payload.background_image,
                    platforms: action.payload.platforms,
                    description: action.payload.description,
                    rating: action.payload.rating,
                    genres: action.payload.genres,
                    released: action.payload.released
                }
            }
        case DELETE_GAME:
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
        case CLEAN_OBJECT:
            return {
                ...state,
                videogameDetail: action.payload
            }
        case MOUNT:
            return {
                ...state,
                mountOrUnmount: action.payload
            }
        case UNMOUNT:
            return {
                ...state,
                mountOrUnmount: action.payload
            }
        default:
            return { ...state }
    }
}
export default reducer