const jwt = require('jsonwebtoken')

const { TimeUtils } = require('../utils')

function verifyToken(req, res, next, secret, callback) {
    const authorization = req.headers.authorization

    if (!authorization)
        return res.status(401).send({ error: 'No token provided' })

    const parts = authorization.split(' ')

    if (!parts.length === 2)
        return res.status(400).send({ error: 'Token error' })

    const [ scheme, token ] = parts

    if (!/^Bearer$/i.test(scheme))
        return res.status(400).send({ error: 'Malformatted token' })

    jwt.verify(token, secret, (err, decoded) => {
        if (err) return res.status(401).send({ error: 'Invalid token' })

        return callback(decoded, next)
    })
}

exports.adminContentAccess = (req, res, next) => {
    verifyToken(req, res, next, process.env.ADMIN_SESSION_SECRET, (decoded, next) => {
        return next()
    })
}

exports.adminRegistrationCode = (req, res, next) => {
    verifyToken(req, res, next, process.env.ADMIN_REGISTER_SECRET, (decoded, next) => {
        return next()
    })
}