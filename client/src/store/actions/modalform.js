import axios from 'axios'
import {FETCH_FILM_ERROR, FETCH_FILM_SUCCESS} from './actionTypes'


export function filmHandler(dataModalForm) {
    return async dispatch => {
        const {
            isNewFilm, handleClose, isOpenModalMessage, isCloseModalMessage, films, name, year,
            description, selectedFile, selectedFileName, filmId, genreId
        } = dataModalForm

        try {
            const token = localStorage.getItem('token')
            let message = ''

            let formData = new FormData()
            formData.append('genre', genreId)
            formData.append('name', name)
            formData.append('year', year)
            formData.append('description', description)
            formData.append('image', selectedFile, selectedFileName)

            if (isNewFilm) {
                const response = await axios.post('/api/film', formData, {headers: {Authorization: token}})
                const film = response.data

                message = `Фильм "${name}" успешно добавлен.`

                films.push(film)
            } else {
                const response = await axios.patch(`/api/film/${filmId}`, formData, {headers: {Authorization: token}})
                message = `Фильм "${name}" успешно отредактирован.`
                const film = response.data
                let idx = -1

                films.find((f, i) => {
                    if (f._id === film._id) {
                        idx = i
                        return true
                    }
                    return false
                })
                if (idx > -1) films.splice(idx, 1, film)
            }

            dispatch(isOpenModalMessage)
            setTimeout(() => {
                dispatch(isCloseModalMessage)
                if (!isNewFilm) handleClose()
            }, 3000)
            dispatch(filmHandlerSuccess(message))
        } catch (e) {
            console.log(e)
            const message = e.message
            dispatch(filmHandlerError(e, message))
            dispatch(isOpenModalMessage)
            setTimeout(() => {
                dispatch(isCloseModalMessage)
            }, 3000)
        }
    }
}

export function filmHandlerSuccess(message) {
    return {
        type: FETCH_FILM_SUCCESS,
        message
    }
}

export function filmHandlerError(e, message) {
    return {
        type: FETCH_FILM_ERROR,
        error: e,
        message
    }
}