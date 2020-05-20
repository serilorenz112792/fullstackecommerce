import { call, takeLatest, put, select, all } from 'redux-saga/effects'
import { loadUserApi, loginApi } from '../../../Api/auth'
import { LOAD_USER, LOGIN } from './constants'
import { loadUserSuccessAction, loadUserFailedAction, loginFailedAction, loginSuccessAction } from './action'
const authState = state => state.auth
function* LoadUserSaga() {
    const auth = yield select(authState)
    try {
        const response = yield call(loadUserApi, auth)
        if (response.status === 200) {
            yield put(loadUserSuccessAction(response.data))
        }
    }
    catch (err) {
        yield put(loadUserFailedAction(err.response.data))
    }

}

function* LoginSaga(action) {
    const { email, password } = action.payload
    const userInfo = {
        email, password
    }
    try {
        const response = yield call(loginApi, userInfo)
        if (response.status === 200) {
            yield put(loginSuccessAction(response.data))
        }
    }
    catch (err) {
        yield put(loginFailedAction({ msg: err.response.data, id: 'LOGIN_FAILED' }))
    }
}

export default function* AuthSaga() {
    yield all([
        takeLatest(LOAD_USER, LoadUserSaga),
        takeLatest(LOGIN, LoginSaga)
    ])
}