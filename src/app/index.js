require('dotenv').config()

const express = require('express')
const path = require('path')

const app = express()
const PORT = process.env.PORT || process.env.DEFAULT_PORT

app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use('/public', express.static(path.resolve('src/www/public')))

require('./routes')(app)
require('./controllers')(app)

app.listen(PORT)