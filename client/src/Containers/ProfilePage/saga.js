import { put, call, all, select, takeLatest, delay } from 'redux-saga/effects'
import {
    getPurchasesSuccessAction, getPurchasesFailedAction, removeItemSuccessAction,
    removeItemFailedAction, getPurchasesAction, changePasswordSuccessAction, changePasswordFailedAction
} from './action'
import { GET_PURCHASES, REMOVE_PURCHASE, CHANGE_PASSWORD } from './constants'
import { getPurchasesApi, removeItemApi, changePasswordApi } from '../../Api/profile'

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
function* ChangePasswordSaga(action) {
    const { currentPassword, newPassword, confirmNewPassword, userId } = action.payload
    const auth = yield select(authState)
    const data = {
        userId,
        currentPassword,
        newPassword,
        confirmNewPassword,
        auth
    }

    try {
        const response = yield call(changePasswordApi, data)
        if (response.status === 200)
            yield put(changePasswordSuccessAction(response.data))

    }
    catch (err) {
        yield put(changePasswordFailedAction(err.response.data))
    }

}
export default function* ProfilePageSaga() {
    yield all([
        takeLatest(GET_PURCHASES, GetPurchasesSaga),
        takeLatest(REMOVE_PURCHASE, RemoveItemSaga),
        takeLatest(CHANGE_PASSWORD, ChangePasswordSaga)
    ])
}