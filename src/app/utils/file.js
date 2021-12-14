const path = require('path')

exports.htmlShorter = function(pageName, res) {
    res.sendFile(path.resolve(`src/www/public/html/${pageName}.html`))
}