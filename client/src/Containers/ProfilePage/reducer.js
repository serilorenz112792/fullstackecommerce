import {
    GET_PURCHASES_SUCCESS,
    REMOVE_PURCHASE_SUCCESS,
    REMOVE_PURCHASE_FAILED
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
        default:
            return state
    }
}

export default profileReducer