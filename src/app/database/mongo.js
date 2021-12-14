const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/brailling')
mongoose.Promise = global.Promise

module.exports = mongoose