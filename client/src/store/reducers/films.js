import {
    ADD_FILM,
    CHANGE_FILM,
    CLOSE_MESSAGE,
    CLOSE_MODAL_FILM,
    DELETE_FILM_ERROR,
    DELETE_FILM_SUCCESS,
    FETCH_FILMS_ERROR,
    FETCH_FILMS_START,
    FETCH_FILMS_SUCCESS,
    OPEN_MESSAGE,
    OPEN_MODAL_FILM
} from '../actions/actionTypes'

const initialState = {
    loading: false,
    isNewFilm: true,
    isOpenMessage: false,
    isOpenModal: false,
    films: [],
    error: null
}

export default function filmsReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_FILMS_START:
            return {
                ...state, loading: true
            }
        case FETCH_FILMS_SUCCESS:
            return {
                ...state, loading: false, films: action.films
            }
        case FETCH_FILMS_ERROR:
            return {
                ...state, loading: false, error: action.error
            }
        case DELETE_FILM_SUCCESS:
            return {
                ...state, loading: false, films: action.films, message: action.message
            }
        case DELETE_FILM_ERROR:
            return {
                ...state, loading: false, error: action.error, message: action.message
            }
        case OPEN_MODAL_FILM:
            return {
                ...state, isOpenModal: true
            }
        case CLOSE_MODAL_FILM:
            return {
                ...state, isOpenModal: false
            }
        case OPEN_MESSAGE:
            return {
                ...state, isOpenMessage: true
            }
        case CLOSE_MESSAGE:
            return {
                ...state, isOpenMessage: false
            }
        case ADD_FILM:
            return {
                ...state, isNewFilm: true
            }
        case CHANGE_FILM:
            return {
                ...state, isNewFilm: false
            }
        default:
            return state
    }
}