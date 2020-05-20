import {
    EDIT_PRODUCT_SUCCESS,
    EDIT_PRODUCT_FAILED,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAILED,
    ADD_PRODUCT_SUCCESS,
    ADD_PRODUCT_FAILED,
    CLEAR_MESSAGE
}
    from './constants'

const initialState = {
    msg: '',
    error: {}
}

const adminReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case CLEAR_MESSAGE:
            return {
                ...state,
                msg: ''
            }
        case EDIT_PRODUCT_SUCCESS:
            return {
                ...state,
                msg: payload
            }
        case EDIT_PRODUCT_FAILED:
            return {
                ...state,
                msg: payload.msg,
                error: payload.error
            }
        case DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                msg: payload
            }
        case DELETE_PRODUCT_FAILED:
            return {
                ...state,
                msg: payload.msg,
                error: payload.error
            }
        case ADD_PRODUCT_SUCCESS:
            return {
                ...state,
                msg: payload
            }
        case ADD_PRODUCT_FAILED:
            return {
                ...state,
                msg: payload.msg,
                error: payload.error
            }
        default:
            return state
    }
}

export default adminReducer