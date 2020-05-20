import { takeLatest, all, put, call } from 'redux-saga/effects'
import { registerApi } from '../../../Api/register'
import { REGISTER } from './constants'
import { registerSuccessAction, registerFailedAction } from './action'

function* Register(action) {
    const { name, email, password } = action.payload
    const userInfo = {
        name,
        email,
        password
    }
    try {
        const response = yield call(registerApi, userInfo)
        if (response.status === 200) {
            yield put(registerSuccessAction(response.data))
        }
    }
    catch (err) {
        yield put(registerFailedAction({ msg: err.response.data, id: 'REGISTER_FAILED' }))
    }
}

export default function* RegisterSaga() {
    yield all([
        takeLatest(REGISTER, Register)
    ])
}