import { put, call, all, select, takeLatest, delay } from 'redux-saga/effects'
import { GET_ITEM, REMOVE_ITEM, BUY_ITEM } from './constants'
import {
    getItemSuccessAction,
    getItemFailedAction,
    removeItemSuccess,
    buyItemSuccessAction,
    buyItemFailedAction
} from './action'
import { buyItemApi } from '../../Api/product'
const authState = state => state.auth
function* GetItemSaga() {
    try {
        const data = JSON.parse(localStorage.getItem('cartProducts'))
        if (data) {
            yield put(getItemSuccessAction(data))
        }
        else yield put(getItemSuccessAction([]))
    }
    catch (err) {
        yield put(getItemFailedAction(err))
    }
}
function* RemoveItemSaga(action) {
    const index = action.payload
    const data = JSON.parse(localStorage.getItem('cartProducts'))
    try {
        const newData = data.filter((obj, indx) => indx !== index)
        localStorage.setItem('cartProducts', JSON.stringify(newData))
        yield delay(600)
        yield put(removeItemSuccess(JSON.parse(localStorage.getItem('cartProducts'))))
    }
    catch (err) {
        console.log("error", err)
    }


}
function* BuyItemSaga(action) {
    const { productId, productName, category, quantity, price, userId, email, purchasedId } = action.payload
    const auth = yield select(authState)
    const data = {
        productId,
        productName,
        category,
        quantity,
        price,
        userId,
        email,
        purchasedId,
        auth
    }
    try {
        const response = yield call(buyItemApi, data)
        if (response.status === 200) {
            yield put(buyItemSuccessAction(response.data))
        }
    }
    catch (err) {
        yield put(buyItemFailedAction(err.response.data))
    }
}
export default function* ShoppingCartSaga() {
    yield all([
        takeLatest(GET_ITEM, GetItemSaga),
        takeLatest(REMOVE_ITEM, RemoveItemSaga),
        takeLatest(BUY_ITEM, BuyItemSaga)
    ])
}