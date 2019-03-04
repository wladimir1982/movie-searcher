import axios from 'axios'
import {AUTH_LOGOUT, AUTH_SUCCESS} from './actionTypes'


export function auth(email, password, isLogin) {
    return async dispatch => {
        const authData = {
            email, password
        }

        if (isLogin) {
            const response = await axios.post('/api/auth/login', authData)
            const data = response.data

            localStorage.setItem('token', data.token)

            dispatch(loginSuccess(data.token))
            dispatch(autoLogout())
        } else {
            await axios.post('/api/auth/register', authData)
        }
    }
}

export function loginSuccess(token) {
    return {
        type: AUTH_SUCCESS,
        token
    }
}

export function autoLogout() {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
            localStorage.setItem('status_401', 'error status 401')
        }, 3600 * 1000)
    }
}

export function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('genre')
    return {
        type: AUTH_LOGOUT
    }
}
