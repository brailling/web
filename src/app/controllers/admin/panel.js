const express = require('express')

const authMiddleware = require('../../middlewares/auth')

const router = express.Router()

router.use(authMiddleware.adminContentAccess)

router.get('/', (req, res) => {
    res.send('OK')
})

module.exports = router