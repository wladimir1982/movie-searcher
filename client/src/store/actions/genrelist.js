import axios from 'axios/index'
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
} from './actionTypes'

export function getAllGenre() {
    return async dispatch => {
        dispatch(fetchGenresStart())
        try {
            const token = localStorage.getItem('token')
            const response = await axios.get('/api/genre', {headers: {Authorization: token}})
            const genres = response.data

            dispatch(fetchGenresSuccess(genres))
        } catch (e) {
            dispatch(fetchGenresError(e))
        }
    }
}

export function fetchGenresStart() {
    return {
        type: FETCH_GENRES_START
    }
}

export function fetchGenresSuccess(genres) {
    return {
        type: FETCH_GENRES_SUCCESS,
        genres
    }
}

export function fetchGenresError(e) {
    return {
        type: FETCH_GENRES_ERROR,
        e
    }
}

export function genreHandler(name, isNew, genreId, genres) {
    return async dispatch => {
        try {
            const message = `Жанр "${name}" ${isNew ? 'добавлен' : 'отредактирован'}. 
            Теперь вы можете выбрать его из списка.`
            const token = localStorage.getItem('token')

            if (isNew) {
                const response = await axios.post('/api/genre', {name: name}, {headers: {Authorization: token}})
                const genre = response.data
                genres.push(genre)
            } else {
                const response = await axios.patch(`/api/genre/${genreId}`, {name: name}, {headers: {Authorization: token}})
                const genre = response.data

                let idx = -1
                genres.find((g, i) => {
                    if (g._id === genre._id) {
                        idx = i
                        return true
                    }
                    return false
                })
                if (idx > -1) genres.splice(idx, 1, genre)
                dispatch(addNewGenre())
            }

            dispatch(genreHandlerSuccess(genres, message))
            dispatch(openMessage())
            setTimeout(() => dispatch(closeMessage()), 3000)

        } catch (e) {
            const message = e.response.data.message
            dispatch(genreHandlerError(e, message))
            dispatch(addNewGenre())
            dispatch(openMessage())
            setTimeout(() => dispatch(closeMessage()), 3000)
        }
    }
}

export function genreHandlerSuccess(genres, message) {
    return {
        type: GENRE_SUCCESS,
        genres,
        message
    }
}

export function addNewGenre() {
    return {
        type: ADD_NEWGENRE
    }
}

export function changeGenre() {
    return {
        type: CHANGE_GENRE
    }
}

export function genreHandlerError(e, message) {
    return {
        type: GENRE_ERROR,
        error: e,
        message
    }
}

export function deleteGenreHandler(genres, genre) {
    return async dispatch => {
        const decision = window.confirm(`Вы уверены, что хотите удалить жанр "${genre.name}"`)
        const token = localStorage.getItem('token')

        try {
            if (decision) {
                const response = await axios.delete(`/api/genre/${genre._id}`, {headers: {Authorization: token}})
                const message = response.data.message
                let idx = -1

                genres.find((g, i) => {
                    if (g._id === genre._id) {
                        idx = i
                        return true
                    }
                    return false
                })
                if (idx > -1) genres.splice(idx, 1)
                dispatch(deleteGenreSuccess(genres, message))
                dispatch(openMessage())
                setTimeout(() => dispatch(closeMessage()), 3000)
            }
        } catch (e) {
            const message = e.message
            dispatch(deleteGenreError(e, message))
            dispatch(openMessage())
            setTimeout(() => dispatch(closeMessage()), 3000)
        }
    }
}

export function deleteGenreSuccess(genres, message) {
    return {
        type: DELETE_GENRE_SUCCESS,
        genres,
        message
    }
}

export function deleteGenreError(e, message) {
    return {
        type: DELETE_GENRE_ERROR,
        error: e,
        message
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