const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { Admin } = require('../../models')
const { Token } = require('../../utils')

const router = express.Router()

router.post('/register', async (req, res) => {
    const { email } = req.body

    try {
        if (await Admin.findOne({ email }))
            return res.status(400).send({ error: 'Already exists' })

        const admin = await Admin.create(req.body)
        const token = Token.generateToken({ id: admin.id })
        admin.password = undefined

        res.send({ account: admin, token: token })

    } catch(err) {
        return res.status(400).send({ error: 'Registration failed' })
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body

    const admin = await Admin.findOne({ email }).select('+password')

    if (!admin)
        req.status(400).send({ error: 'Not found' })

    if (!await bcrypt.compare(password, admin.password))
        req.status(400).send({ error: 'Invalid password' })

    const token = Token.generateToken({ id: admin.id })
    admin.password = undefined

    res.send({ account: admin, token: token })
})

module.exports = router