import {
    GET_PURCHASES,
    GET_PURCHASES_SUCCESS,
    GET_PURCHASES_FAILED,
    REMOVE_PURCHASE,
    REMOVE_PURCHASE_SUCCESS,
    REMOVE_PURCHASE_FAILED
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