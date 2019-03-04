import {combineReducers} from 'redux'
import authReducer from './auth'
import genreReducer from './genrelist'
import filmsReducer from './films'
import modalFormReducer from './modalform'


export default combineReducers({
    auth: authReducer,
    genres: genreReducer,
    films: filmsReducer,
    modalform: modalFormReducer
})