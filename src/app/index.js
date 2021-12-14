const express = require('express')
const path = require('path')

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use('/public', express.static(path.resolve('src/www/public')))

const routes = require('./routes/index')
app.use(routes)

app.listen(8000)