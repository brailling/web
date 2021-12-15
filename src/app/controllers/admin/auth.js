const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const mailer = require('../../mail')
const authMiddleware = require('../../middlewares/auth')
const { AdminModel } = require('../../models')
const { TimeUtils } = require('../../utils')

const router = express.Router()

router.use('/register/code-verification', authMiddleware.adminRegistrationCode)

router.post('/register', async (req, res) => {
    const { email } = req.body

    try {
        const personalSecret = await bcrypt.hash(process.env.ADMIN_REGISTER_SECRET, 12)

        const mail = {
            from: 'server@servermail.com',
            to: 'registeradmin@servermail.com',
            subject: 'admin registration request',
            text: `secret code: ${personalSecret}`
        }
        mailer.sendMail(mail, err => {
            if (err)
                res.status(400).send({ error: 'cannot send mail' })

            const registerToken = jwt.sign(
                {}, 
                personalSecret,
                { expiresIn: TimeUtils.MINUTE * 30 }
            )

            const codeToken = jwt.sign(
                {}, 
                process.env.ADMIN_REGISTER_SECRET,
                { expiresIn: TimeUtils.MINUTE * 30 }
            )

            res.send({ codeToken: codeToken, registerToken: registerToken })  
        })

        /*
        if (await AdminModel.findOne({ email }))
            return res.status(400).send({ error: 'Already exists' })

        await AdminModel.create(req.body)
        */

    } catch(err) {
        return res.status(400).send({ error: 'Registration failed' })
    }
})

router.post('/register/code-verification', (req, res) => {
    jwt.verify(req.body.registerToken, req.body.secretKey, err => {
        if (err) {
            console.log(err)
            return res.send({ error: 'token dont match' })
        }
        const token = jwt.sign(
            {}, 
            process.env.ADMIN_SESSION_SECRET,
            { expiresIn: TimeUtils.DAY }
        )
    
        return res.send({ token: token })
    })
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body

    const admin = await AdminModel.findOne({ email }).select('+password')

    if (!admin)
        req.status(400).send({ error: 'Not found' })

    if (!await bcrypt.compare(password, admin.password))
        req.status(400).send({ error: 'Invalid password' })

    const token = jwt.sign(
        { id: admin.id }, 
        process.env.ADMIN_SESSION_SECRET,
        { expiresIn: TimeUtils.DAY }
    )

    res.send({ token: token })
})

module.exports = router