import {FETCH_FILM_ERROR, FETCH_FILM_SUCCESS} from '../actions/actionTypes'


const initialState = {
    message: ''
}

export default function modalFormReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_FILM_SUCCESS:
            return {
                ...state, message: action.message
            }
        case FETCH_FILM_ERROR:
            return {
                ...state, error: action.error, message: action.message
            }
        default:
            return state
    }
}