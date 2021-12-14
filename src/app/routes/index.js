const router = require('express').Router()

const { File } = require('../utils/index')

router.get('/:page', (req, res) => { File.htmlShorter(req.params.page, res) })

module.exports = router