import { combineReducers } from 'redux'
import authReducer from './Containers/Authentication/LoginPage/reducer'
import registerReducer from './Containers/Authentication/RegisterPage/reducer'
import homeReducer from './Containers/HomePage/reducer'
import shoppingCartReducer from './Containers/ShoppingCartPage/reducer'
import profileReducer from './Containers/ProfilePage/reducer'
import adminReducer from './Containers/AdminPage/reducer'
export default combineReducers({
    auth: authReducer, register: registerReducer, home: homeReducer,
    cart: shoppingCartReducer, profile: profileReducer, admin: adminReducer
})