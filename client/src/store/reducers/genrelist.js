import {
    ADD_NEWGENRE,
    CHANGE_GENRE,
    CLOSE_MESSAGE,
    DELETE_GENRE_ERROR,
    DELETE_GENRE_SUCCESS,
    FETCH_GENRES_ERROR,
    FETCH_GENRES_START,
    FETCH_GENRES_SUCCESS,
    GENRE_ERROR,
    GENRE_SUCCESS,
    OPEN_MESSAGE
} from '../actions/actionTypes'


const initialState = {
    isInitial: true,
    isNew: true,
    loading: false,
    isOpenMessage: false,
    genres: [],
    message: ''
}


export default function genreReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_GENRES_START:
            return {
                ...state, loading: true
            }
        case FETCH_GENRES_SUCCESS:
            return {
                ...state, loading: false, genres: action.genres
            }
        case FETCH_GENRES_ERROR:
            return {
                ...state, loading: false, error: action.error
            }
        case GENRE_SUCCESS:
            return {
                ...state, genres: action.genres, message: action.message
            }
        case GENRE_ERROR:
            return {
                ...state, error: action.error, message: action.message
            }
        case ADD_NEWGENRE:
            return {
                ...state, isNew: true
            }
        case CHANGE_GENRE:
            return {
                ...state, isNew: false
            }
        case DELETE_GENRE_SUCCESS:
            return {
                ...state, genres: action.genres, message: action.message
            }
        case DELETE_GENRE_ERROR:
            return {
                ...state, error: action.error, message: action.message
            }
        case OPEN_MESSAGE:
            return {
                ...state, isOpenMessage: true
            }
        case CLOSE_MESSAGE:
            return {
                ...state, isOpenMessage: false
            }
        default:
            return state
    }
}