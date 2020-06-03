import {
    GET_PURCHASES,
    GET_PURCHASES_SUCCESS,
    GET_PURCHASES_FAILED,
    REMOVE_PURCHASE,
    REMOVE_PURCHASE_SUCCESS,
    REMOVE_PURCHASE_FAILED,
    CHANGE_PASSWORD,
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_FAILED,
    CLEAR_MESSAGE
}
    from './constants'

export const getPurchasesAction = userId => {
    return {
        type: GET_PURCHASES,
        payload: userId
    }
}

export const getPurchasesSuccessAction = data => {
    return {
        type: GET_PURCHASES_SUCCESS,
        payload: data
    }
}

export const getPurchasesFailedAction = msg => {
    return {
        type: GET_PURCHASES_SUCCESS,
        payload: msg
    }
}

export const removeItemAction = data => {
    return {
        type: REMOVE_PURCHASE,
        payload: data
    }
}

export const removeItemSuccessAction = msg => {
    return {
        type: REMOVE_PURCHASE_SUCCESS,
        payload: msg
    }
}

export const removeItemFailedAction = data => {
    return {
        type: REMOVE_PURCHASE_FAILED,
        payload: data
    }
}

export const changePasswordAction = data => {

    return {
        type: CHANGE_PASSWORD,
        payload: data
    }
}

export const changePasswordSuccessAction = msg => {
    return {
        type: CHANGE_PASSWORD_SUCCESS,
        payload: msg
    }
}

export const changePasswordFailedAction = error => {
    return {
        type: CHANGE_PASSWORD_FAILED,
        payload: error
    }
}

export const clearMessageAction = () => {
    return {
        type: CLEAR_MESSAGE,

    }
}

