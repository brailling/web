const router = require('express').Router()

const { FileUtils } = require('../utils')

router.get('/:page', (req, res) => { FileUtils.htmlShorter(req.params.page, res) })

module.exports = app => app.use('/', router)