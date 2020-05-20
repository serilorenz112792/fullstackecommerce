import axios from 'axios'

const config = {
    headers: {
        'Content-Type': 'application/json'
    }
}

export async function registerApi({ name, email, password }) {
    const body = JSON.stringify({ name, email, password })
    return await axios.post('/api/users/register', body, config)
}