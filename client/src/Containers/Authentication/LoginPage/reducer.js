import {
    LOAD_USER_SUCCESS,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGOUT,
    LOAD_USER_FAILED,
    CLEAR_MSG
}
    from './constants'

const initialState = {
    token: localStorage.getItem('token'),
    user: null,
    isAuthenticated: false,
    msg: {
        content: '',
        id: ''
    },
    error: {}
}

const authReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case CLEAR_MSG: {
            return {
                ...state,
                msg: {}
            }
        }
        case LOAD_USER_SUCCESS: {
            return {
                ...state,
                isAuthenticated: true,
                user: payload
            }
        }
        case LOAD_USER_FAILED: {
            return {
                ...state,
                msg: payload.msg
            }
        }
        case LOGIN_SUCCESS: {
            localStorage.setItem('token', payload.token)
            return {
                ...state,
                isAuthenticated: true,
                user: payload.user,
                msg: payload.msg,
                token: payload.token
            }
        }
        case LOGIN_FAILED: {
            return {
                ...state,
                msg: {
                    content: payload.msg,
                    id: payload.id
                }
            }
        }
        case LOGOUT: {
            localStorage.removeItem('token')
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                msg: '',
                error: {},
                token: null
            }
        }
        default:
            return state
    }
}

export default authReducer