import { tokenConfig } from './auth'
import axios from 'axios'

export async function getPurchasesApi({ userId, auth }) {
    return await axios.get(`/api/users/purchases/${userId}`, tokenConfig(auth))
}

export async function removeItemApi({ userId, purchasedId, auth }) {
    const body = JSON.stringify({ purchasedId })
    return await axios.put(`/api/users/removeitem/${userId}`, body, tokenConfig(auth))
}

export async function changePasswordApi({ userId, currentPassword, newPassword, confirmNewPassword, auth }) {
    const body = JSON.stringify({ currentPassword, newPassword, confirmNewPassword })

    return await axios.put(`/api/users/changepass/${userId}`, body, tokenConfig(auth))
}