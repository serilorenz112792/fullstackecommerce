import { put, call, all, select, takeLatest, delay } from 'redux-saga/effects'
import {
    editProductSuccessAction, editProductFailedAction,
    deleteItemSuccessAction, deleteItemFailedAction,
    addProductSuccessAction, addProductFailedAction
} from './action'
import { editItemApi, deleteItemApi, addProductApi } from '../../Api/product'
import { EDIT_PRODUCT, DELETE_PRODUCT, ADD_PRODUCT } from './constants'
import { getProductsAction } from '../HomePage/action'
const authState = state => state.auth

function* EditProductSaga(action) {
    const { productId, productName, price, quantity, imgData } = action.payload

    const auth = yield select(authState)
    const edittedProduct = {
        productId,
        productName,
        price,
        quantity,
        imgData,
        auth
    }
    try {
        const response = yield call(editItemApi, edittedProduct)
        if (response.status === 200) {
            yield put(editProductSuccessAction(response.data))
            yield delay(1000)
            yield put(getProductsAction())
        }
    }
    catch (err) {
        yield put(editProductFailedAction(err.response.data))
    }
}
function* DeleteItemSaga(action) {
    const { productId } = action.payload
    const auth = yield select(authState)
    const data = {
        productId,
        auth
    }
    try {
        const response = yield call(deleteItemApi, data)
        if (response.status === 200) {
            yield put(deleteItemSuccessAction(response.data))
            yield delay(1000)
            yield put(getProductsAction())
        }
    }
    catch (err) {
        yield put(deleteItemFailedAction(err.response.data))
    }
}
function* AddItemSaga(action) {
    const { productName, category, price, quantity, imgData } = action.payload
    const auth = yield select(authState)

    const data = {
        productName,
        category,
        price,
        quantity,
        imgData,
        auth
    }
    try {
        const response = yield call(addProductApi, data)
        if (response.status === 200) {
            yield put(addProductSuccessAction(response.data))
            yield delay(1000)
            yield put(getProductsAction())
        }
    }
    catch (err) {
        yield put(addProductFailedAction(err.response.data))
    }
}
export default function* AdminSaga() {
    yield all([
        takeLatest(EDIT_PRODUCT, EditProductSaga),
        takeLatest(DELETE_PRODUCT, DeleteItemSaga),
        takeLatest(ADD_PRODUCT, AddItemSaga)
    ])
}