import { put, call, all, select, takeLatest, delay } from 'redux-saga/effects'
import {
    getPurchasesSuccessAction, getPurchasesFailedAction, removeItemSuccessAction,
    removeItemFailedAction, getPurchasesAction
} from './action'
import { GET_PURCHASES, REMOVE_PURCHASE } from './constants'
import { getPurchasesApi, removeItemApi } from '../../Api/profile'

const authState = state => state.auth

function* GetPurchasesSaga(action) {
    const userId = action.payload

    const auth = yield select(authState)
    const data = {
        userId,
        auth
    }
    try {
        const response = yield call(getPurchasesApi, data)
        yield put(getPurchasesSuccessAction(response.data))
    }
    catch (err) {
        yield put(getPurchasesFailedAction(err.response.data))
    }
}
function* RemoveItemSaga(action) {
    const { userId, purchasedId } = action.payload

    const auth = yield select(authState)
    const uid = auth.user && auth.user._id
    const data = {
        userId,
        purchasedId,
        auth
    }
    try {
        const response = yield call(removeItemApi, data)
        if (response.status === 200) {
            yield put(removeItemSuccessAction(response.data))
            yield put(getPurchasesAction(uid))
        }


    }
    catch (err) {
        yield put(removeItemFailedAction(err.response.data))
    }
}
export default function* ProfilePageSaga() {
    yield all([
        takeLatest(GET_PURCHASES, GetPurchasesSaga),
        takeLatest(REMOVE_PURCHASE, RemoveItemSaga)
    ])
}