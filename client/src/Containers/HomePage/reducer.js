import {
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_FAILED
}
    from './constants'

const initialState = {
    products: [],
    error: {}
}
const homeReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case GET_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: payload
            }
        case GET_PRODUCTS_FAILED:
            return {
                ...state,
                error: payload
            }
        default:
            return state
    }
}

export default homeReducer