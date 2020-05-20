import {
    LOAD_USER,
    LOAD_USER_SUCCESS,
    LOGIN,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOAD_USER_FAILED,
    LOGOUT,
    CLEAR_MSG
}
    from './constants'
export const clearMsgAction = () => {
    return {
        type: CLEAR_MSG
    }
}
export const loadUserAction = () => {
    return {
        type: LOAD_USER
    }
}

export const loadUserSuccessAction = (userInfo) => {
    return {
        type: LOAD_USER_SUCCESS,
        payload: userInfo
    }
}

export const loadUserFailedAction = info => {
    return {
        type: LOAD_USER_FAILED,
        payload: info
    }
}

export const loginAction = userInfo => {
    return {
        type: LOGIN,
        payload: userInfo
    }
}

export const loginSuccessAction = info => {
    return {
        type: LOGIN_SUCCESS,
        payload: info
    }
}

export const loginFailedAction = info => {
    return {
        type: LOGIN_FAILED,
        payload: info
    }
}

export const logoutAction = () => {
    return {
        type: LOGOUT
    }
}