const nodemailer = require('nodemailer')
require('dotenv').config()
let auth = {}
if (process.env.NODE_ENV === 'production') {
    auth = {
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
}
else {
    auth = {
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
}
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth
})

module.exports = transporter