const auth = require('./auth')
const panel = require('./panel')

module.exports = app => {
    app.use('/admin/auth', auth)
    app.use('/admin/panel', panel)
}