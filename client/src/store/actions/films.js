import axios from 'axios/index'
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
} from './actionTypes'

export function fetchFilms() {
    return async dispatch => {
        const token = localStorage.getItem('token')
        const genreId = window.location.pathname.split('/')[2]

        try {
            dispatch(fetchFilmsStart())
            const response = await axios.get(`/api/film/${genreId}`, {headers: {Authorization: token}})
            const films = response.data

            dispatch(fetchFilmsSuccess(films))
        } catch (e) {
            dispatch(fetchFilmsError(e))
        }
    }
}

export function fetchFilmsStart() {
    return {
        type: FETCH_FILMS_START
    }
}

export function fetchFilmsSuccess(films) {
    return {
        type: FETCH_FILMS_SUCCESS,
        films
    }
}

export function fetchFilmsError(e) {
    return {
        type: FETCH_FILMS_ERROR,
        error: e
    }
}

export function deleteFilm(name, id) {
    return async dispatch => {
        const decision = window.confirm(`Вы уверены, что хотите удалить фильм "${name}"`)
        const token = localStorage.getItem('token')
        const genreId = window.location.pathname.split('/')[2]

        try {
            if (decision) {
                const response = await axios.delete(`/api/film/${id}`, {headers: {Authorization: token}})
                const message = response.data.message
                const responseFilms = await axios.get(`/api/film/${genreId}`, {headers: {Authorization: token}})
                const films = responseFilms.data
                dispatch(deleteFilmSuccess(films, message))
                dispatch(openMessage())
                setTimeout(() => dispatch(closeMessage()), 3000)
            }
        } catch (e) {
            const message = e.response.data.message
            dispatch(deleteFilmError(e, message))
            dispatch(openMessage())
            setTimeout(() => dispatch(closeMessage()), 3000)
        }
    }
}

export function deleteFilmSuccess(films, message) {
    return {
        type: DELETE_FILM_SUCCESS,
        films,
        message
    }
}

export function deleteFilmError(e, message) {
    return {
        type: DELETE_FILM_ERROR,
        error: e,
        message
    }
}

export function openModalFilm() {
    return {
        type: OPEN_MODAL_FILM
    }
}

export function closeModalFilm() {
    return {
        type: CLOSE_MODAL_FILM
    }
}

export function openMessage() {
    return {
        type: OPEN_MESSAGE
    }
}

export function closeMessage() {
    return {
        type: CLOSE_MESSAGE
    }
}

export function addFilm() {
    return {
        type: ADD_FILM
    }
}

export function changeFilm() {
    return {
        type: CHANGE_FILM
    }
}