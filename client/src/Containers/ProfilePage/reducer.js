import {
    GET_PURCHASES_SUCCESS,
    REMOVE_PURCHASE_SUCCESS,
    REMOVE_PURCHASE_FAILED,
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_FAILED,
    CLEAR_MESSAGE
}
    from './constants'

const initialState = {
    purchases: [],
    msg: '',
    error: {}
}

const profileReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case CLEAR_MESSAGE:
            return {
                ...state,
                msg: '',
                error: {}
            }
        case GET_PURCHASES_SUCCESS:
            return {
                ...state,
                purchases: payload
            }
        case REMOVE_PURCHASE_SUCCESS:
            return {
                ...state,
                msg: payload
            }
        case REMOVE_PURCHASE_FAILED:
            return {
                ...state,
                msg: payload.msg,
                error: payload.error
            }
        case CHANGE_PASSWORD_SUCCESS:
            return {
                ...state,
                msg: payload
            }
        case CHANGE_PASSWORD_FAILED:
            return {
                ...state,
                msg: payload.msg,
                error: payload.error
            }
        default:
            return state
    }
}

export default profileReducer