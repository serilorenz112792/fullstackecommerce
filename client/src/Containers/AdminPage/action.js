import {
    EDIT_PRODUCT,
    EDIT_PRODUCT_SUCCESS,
    EDIT_PRODUCT_FAILED,
    DELETE_PRODUCT,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAILED,
    ADD_PRODUCT,
    ADD_PRODUCT_SUCCESS,
    ADD_PRODUCT_FAILED,
    CLEAR_MESSAGE
}
    from './constants'


export const clearMessageAction = () => {
    return {
        type: CLEAR_MESSAGE
    }
}

export const editProductAction = data => {
    return {
        type: EDIT_PRODUCT,
        payload: data
    }
}

export const editProductSuccessAction = msg => {
    return {
        type: EDIT_PRODUCT_SUCCESS,
        payload: msg
    }
}

export const editProductFailedAction = data => {
    return {
        type: EDIT_PRODUCT_FAILED,
        payload: data
    }
}

export const deleteItemAction = id => {
    return {
        type: DELETE_PRODUCT,
        payload: id
    }
}

export const deleteItemSuccessAction = msg => {
    return {
        type: DELETE_PRODUCT_SUCCESS,
        payload: msg
    }
}

export const deleteItemFailedAction = data => {
    return {
        type: DELETE_PRODUCT_FAILED,
        payload: data
    }
}

export const addProductAction = data => {
    return {
        type: ADD_PRODUCT,
        payload: data
    }
}

export const addProductSuccessAction = msg => {
    return {
        type: ADD_PRODUCT_SUCCESS,
        payload: msg
    }
}

export const addProductFailedAction = data => {
    return {
        type: ADD_PRODUCT_FAILED,
        payload: data
    }
}