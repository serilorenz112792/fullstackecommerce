import {
    REGISTER_SUCCESS,
    REGISTER_FAILED,
    CLEAR_MSG
}
    from './constants'


const initialState = {
    msg: {
        content: '',
        id: ''
    }
}
const registerReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case REGISTER_SUCCESS:
            return {
                ...state,
                msg: payload
            }
        case REGISTER_FAILED:
            return {
                ...state,
                msg: {
                    content: payload.msg,
                    id: payload.id
                }
            }
        case CLEAR_MSG:
            return {
                ...state,
                msg: ""
            }
        default:
            return state
    }
}

export default registerReducer