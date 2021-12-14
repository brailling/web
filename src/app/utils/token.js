const jwt = require('jsonwebtoken')

const authConfig = require('../config/auth')

exports.generateToken = (payload, options={expiresIn: 86400}) => {
    return jwt.sign(payload, authConfig.secret, options)
}