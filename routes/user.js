const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const router = express.Router()

const User = require('../models/user')
const auth = require('../middlware/auth')
const transporter = require('../middlware/transporter')
//@ POST
//@ DESC - To create a new user
//@ PUBLIC
router.post('/register', (req, res) => {
    const { name, email, password } = req.body
    if (name === '' || email === '' || password === '') return res.status(400).json({ msg: 'All fields are required' })
    if (password.length < 8) return res.status(400).json({ msg: 'Password must be greater than or equal to 8 characters' })
    let role = ''
    if (email.toLowerCase().includes('admin')) role = 'Admin'
    else role = 'Customer'
    const newUser = User({
        name,
        email,
        password,
        role
    })
    const mailOptions = {
        from: 'serilorenz112792@gmail.com',
        to: email,
        subject: 'Account Creation',
        html: `<h4 style="font-size:20px;font-weight:bold;font-family:sans-serif;font-style:italic; text-align:center">Thank you <span style="color:red;">${name}</span> for creating an account at Zner-Store</h4>
               <span style="font-style:italic;font-weight:bold;font-size:30; text-align:center; font-family:sans-serif">
                   Enjoy your shopping :)
               </span>
              `
    }
    User.findOne({ email }).then((user) => {

        if (user) return res.status(400).json({ msg: 'Username already exist' })
        bcrypt.genSalt(10, (err, salt) => {
            if (err) return res.status(400).json({ error: err })
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) return res.status(400).json({ error: err })
                newUser.password = hash
                newUser.save().then((user) => {
                    let emailMsg = {}
                    transporter.sendMail(mailOptions, (err, info) => {
                        err ? emailMsg = err : emailMsg = info
                        res.status(200).json({ msg: 'Created successfully!', emailMsg })
                    })

                }).catch(err => {
                    res.status(400).json({ msg: 'Failed to create a user!', error: err })
                })
            })
        })
    })

})

//@ GET
//@ DESC - get all the users
//@ PUBLIC
router.get('/', (req, res) => {
    User.find()
        .then((user) => {
            res.status(200).json(user)
        })
        .catch(err => {
            res.status(400).json({ error: err })
        })
})


//@DELETE 
//@DESC - delete purchased item on profile list
//@PRIVATE 
router.put('/removeitem/:id', auth, async (req, res) => {
    //id = userId
    await User.update({ _id: req.params.id },
        { $pull: { purchases: { purchasedId: req.body.purchasedId } } })
        .then(() => {
            res.status(200).json({ msg: 'Item removed!' })
        })
        .catch(err => {
            res.status(400).json({ msg: 'Failed to remove item', error: err })
        })
})

//@GET
//@DESC - get all purchases of a user
//@PRIVATE
router.get('/purchases/:id', auth, async (req, res) => {
    //id = userId
    await User.findById(req.params.id)
        .then(user => {
            //const purchases = user.purchases
            res.status(200).json({ item: user.purchases })
        })
        .catch(err => {
            res.status(400).json({ msg: 'Failed to get purchases' })
        })
})



//@PUT
//@DESC - change password
//@PRIVATE
router.put('/changepass/:id', auth, async (req, res) => {

    const { currentPassword, newPassword, confirmNewPassword } = req.body
    if (currentPassword === '' || newPassword === '' || confirmNewPassword === '') return res.status(400).json({ msg: 'all fields are required!' })
    if (newPassword !== confirmNewPassword) return res.status(400).json({ msg: 'new password and confirm password must match!' })

    await User.findById(req.params.id)
        .then((user) => {

            bcrypt.compare(currentPassword, user.password).then((isMatch) => {
                if (!isMatch) return res.status(400).json({ msg: 'incorrect password' })

                bcrypt.hash(newPassword, 10, (err, hash) => {
                    if (err) return res.status(400).json({ error: err })

                    User.findByIdAndUpdate(user._id, { password: hash }).then(() => {
                        res.status(200).json({ msg: 'change password success!' })
                    }).catch(err => {
                        res.status(400).json({ msg: 'Failed to change pass', error: err })
                    })
                })
            }).catch(err => {
                res.status(400).json({ error: err })
            })
        })
        .catch(err => {
            res.status(400).json({ error: err })
        })
})

module.exports = router