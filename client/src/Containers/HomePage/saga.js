import { put, call, all, select, takeLatest } from 'redux-saga/effects'
import { GET_PRODUCTS } from './constants'
import { getProductsSuccessAction, getProductsFailedAction } from './action'
import { getProductsApi } from '../../Api/product'
const authState = state => state.auth
function* GetProductsSaga() {
    const auth = yield select(authState)
    try {
        const response = yield call(getProductsApi, auth)
        if (response.status === 200) {
            yield put(getProductsSuccessAction(response.data))
        }
    }
    catch (err) {
        yield put(getProductsFailedAction(err.response.data))
    }
}

export default function* HomeSaga() {
    yield all([
        takeLatest(GET_PRODUCTS, GetProductsSaga)
    ])
}