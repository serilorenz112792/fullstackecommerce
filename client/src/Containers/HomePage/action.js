import {
    GET_PRODUCTS,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_FAILED
}
    from './constants'

export const getProductsAction = () => {
    return {
        type: GET_PRODUCTS
    }
}

export const getProductsSuccessAction = products => {
    return {
        type: GET_PRODUCTS_SUCCESS,
        payload: products
    }
}

export const getProductsFailedAction = err => {
    return {
        type: GET_PRODUCTS_FAILED,
        payload: err
    }
}