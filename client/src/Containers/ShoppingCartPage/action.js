import {
    GET_ITEM,
    GET_ITEM_SUCCESS,
    GET_ITEM_FAILED,
    REMOVE_ITEM,
    REMOVE_ITEM_SUCCESS,
    BUY_ITEM,
    BUY_ITEM_SUCCESS,
    BUY_ITEM_FAILED,
    CLEAR_MESSAGE
} from './constants'

export const clearMessage = () => {
    return {
        type: CLEAR_MESSAGE
    }

}

export const getItemAction = () => {
    return {
        type: GET_ITEM
    }
}

export const getItemSuccessAction = (data) => {
    return {
        type: GET_ITEM_SUCCESS,
        payload: data
    }
}

export const getItemFailedAction = (data) => {
    return {
        type: GET_ITEM_FAILED,
        payload: data
    }
}

export const removeItemAction = index => {
    return {
        type: REMOVE_ITEM,
        payload: index
    }
}

export const removeItemSuccess = newArr => {
    return {
        type: REMOVE_ITEM_SUCCESS,
        payload: newArr
    }
}


export const buyItemAction = productInfo => {
    return {
        type: BUY_ITEM,
        payload: productInfo
    }
}

export const buyItemSuccessAction = msg => {
    return {
        type: BUY_ITEM_SUCCESS,
        payload: msg
    }
}

export const buyItemFailedAction = error => {
    return {
        type: BUY_ITEM_FAILED,
        payload: error
    }
}
