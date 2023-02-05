const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { User } = require('../model/Users')
const { ACCESS_TOKEN_SECRET } = require('../config/config')

router.post('/login', async (req, res) => {
    let user = await User.findOne({ where: { username: req.body.username } })
    user = user.dataValues
    if (user === null) {
        return res.status(404).send('Cannot find the user')
    }
    try {
        if (bcrypt.compareSync(req.body.password, user.password)) {
            const accessToken = jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: '60m' })

            res.json({
                status: 'Success',
                token_type: 'Bearer',
                token: accessToken
            })
        }
        else {
            res.status(401).send()
        }
    } catch (error) {
        res.status(500).send()
    }
})

router.post('/register', async (req, res) => {
    if (req.body.username !== undefined && req.body.password !== undefined && req.body.name !== undefined) {
        try {
            const user = await User.findOne({ where: { username: req.body.username } })
            if (user !== null) {
                return res.status(400).json({
                    status: 'Error',
                    message: 'Username already existed in our database'
                })
            }

            const password = bcrypt.hashSync(req.body.password, 10)
            let newUser = {
                name: req.body.name,
                username: req.body.username,
                password
            }

            newUser = await User.create(newUser)
            res.status(201).json({
                status: 'Success',
                user: {
                    name: newUser.name,
                    username: newUser.username
                }
            })
        } catch (error) {
            res.status(500).send()
        }
    }
    else {
        return res.status(400).json({
            status: 'Error',
            message: 'Make sure to include name, username and password'
        })
    }
})

module.exports = router 