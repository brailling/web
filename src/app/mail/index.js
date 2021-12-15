const nodemailer = require('nodemailer')

module.exports = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
       user: '0d2e5d7c95f28c',
       pass: '3a2746d570f75c'
    }
})