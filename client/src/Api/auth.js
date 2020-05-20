import axios from 'axios'

export const tokenConfig = (getState) => {
    const token = getState.token

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
    }

    return config
}

export async function loadUserApi(auth) {
    return await axios.get('/api/auth', tokenConfig(auth))
}

export async function loginApi({ email, password }) {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ email, password })
    return await axios.post('/api/auth/login', body, config)
}