import { all } from 'redux-saga/effects';
import AuthSaga from './Containers/Authentication/LoginPage/saga'
import RegisterSaga from './Containers/Authentication/RegisterPage/saga'
import HomeSaga from './Containers/HomePage/saga'
import ShoppingCartSaga from './Containers/ShoppingCartPage/saga'
import ProfilePageSaga from './Containers/ProfilePage/saga'
import AdminSaga from './Containers/AdminPage/saga'
export default function* sagas() {
    yield all([
        AuthSaga(),
        RegisterSaga(),
        HomeSaga(),
        ShoppingCartSaga(),
        ProfilePageSaga(),
        AdminSaga()
    ]);
}