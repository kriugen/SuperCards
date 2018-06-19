var path = require('path')

module.exports = function (app) {

    app.use(function (req, res) {
        res.status(404)
        res.sendFile(path.resolve('views/404.html'))
    })

    app.use(function (err, req, res) {
        console.error(err.stack)
        res.status(500)
        res.sendFile(path.resolve('views/500.html'))
    })
}