import {
    GET_ITEM_SUCCESS,
    GET_ITEM_FAILED,
    REMOVE_ITEM_SUCCESS,
    BUY_ITEM_SUCCESS,
    BUY_ITEM_FAILED,
    CLEAR_MESSAGE
} from './constants'

const initialState = {
    cartItems: [],
    msg: '',
    error: {}
}


const shoppingCartReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case CLEAR_MESSAGE: {
            return {
                ...state,
                msg: '',
                error: {}
            }
        }
        case GET_ITEM_SUCCESS: {
            return {
                ...state,
                cartItems: payload
            }
        }
        case REMOVE_ITEM_SUCCESS: {
            return {
                ...state,
                cartItems: payload
            }
        }
        case BUY_ITEM_SUCCESS: {
            return {
                ...state,
                msg: payload
            }
        }
        case BUY_ITEM_FAILED: {
            return {
                ...state,
                msg: payload.msg,
                error: payload.emailError
            }
        }
        default:
            return state
    }
}

export default shoppingCartReducer