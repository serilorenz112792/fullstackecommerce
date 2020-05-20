import {
    REGISTER,
    REGISTER_SUCCESS,
    REGISTER_FAILED,
    CLEAR_MSG
}
    from './constants'

export const clearMsgAction = () => {
    return {
        type: CLEAR_MSG
    }
}
export const registerAction = userInfo => {
    return {
        type: REGISTER,
        payload: userInfo
    }
}

export const registerSuccessAction = msg => {
    return {
        type: REGISTER_SUCCESS,
        payload: msg
    }
}

export const registerFailedAction = msg => {
    return {
        type: REGISTER_FAILED,
        payload: msg
    }
}