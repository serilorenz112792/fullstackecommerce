import { tokenConfig } from './auth'
import axios from 'axios'


export const tokenConfigFormData = getState => {
    // Get token from local storage
    const token = getState.token;

    //Headers
    const config = {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }

    //if token, add to headers
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
    }

    return config
}

export async function getProductsApi(auth) {

    return await axios.get('/api/products', tokenConfig(auth))
}

export async function buyItemApi({ productId, price, productName, category, quantity, userId, email, purchasedId, auth }) {

    const id = JSON.stringify(productId)
    const body = JSON.stringify({ productName, category, price, quantity, userId, email, purchasedId })

    return await axios.put(`/api/products/buy/${productId}`, body, tokenConfig(auth))
}


//for admin

export async function editItemApi({ productId, productName, price, quantity, imgData, auth }) {

    const bodyFormData = new FormData();
    bodyFormData.set('productName', productName)
    bodyFormData.append('price', price)
    bodyFormData.append('quantity', quantity)
    bodyFormData.append('productImage', imgData)


    return await axios.put(`/api/products/edit/${productId}`, bodyFormData, tokenConfigFormData(auth))
}


export async function deleteItemApi({ productId, auth }) {
    return await axios.delete(`/api/products/delete/${productId}`, tokenConfig(auth))
}


export async function addProductApi({ productName, price, category, quantity, imgData, auth }) {
    const bodyFormData = new FormData();
    bodyFormData.set('productName', productName)
    bodyFormData.append('category', category)
    bodyFormData.append('price', price)
    bodyFormData.append('quantity', quantity)
    bodyFormData.append('productImage', imgData)
    return await axios.post('/api/products/add', bodyFormData, tokenConfigFormData(auth))
}

