import * as express from "express"
import config from './config'
import { Request, Response } from './types/custom'
import { RequestLimit } from './meta'
import log from './logger'

var cookieParser = require('cookie-parser')
var session = require('express-session')
var MySQLStore = require('express-mysql-session')(session)
var sessionStore = new MySQLStore(config.databaseConnection)

var app = express()

app.use(cookieParser())
app.use(session({
    secret: '896ebb04-e71f-4fa1-adb8-3b3a9ac0e74c',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
}))

app.use(require('cors')({ credentials: true, origin: config.client }))

var bodyParser = require('body-parser')
app.use(bodyParser.json({limit: RequestLimit}))

import { auth } from './routes/auth'
auth(app)

app.use('/api', (req: Request, res: Response, next) => {
    if (req.session.user_id) {
        next()
    } else {
        res.status(401)
        res.send('Please login')
    }
})

var router = express.Router()
app.use('/api', router)

import * as path from 'path'
let root = path.resolve('./public')
app.use('/', function ( req, res, next ) {
    if (/\/[^.]*$/.test(req.url)) {
        res.sendfile(path.join(root, 'index.html'));
    } else {
        //if url contains dot, means an image or a script
        //allow to fall through and serve resource from public
        next(); 
    }
})

app.use(express.static(root))

import { cards } from './routes/cards'
cards(router)

require('./routes/errors')(app)

//start the server

var http = require('http')
var server = http.createServer(app)

const port = process.env.PORT || config.port

server.listen(port, function () {
    let dateTime = new Date()
    let dateTimeString = dateTime.toDateString() + ' ' + dateTime.toTimeString()
    log.info(dateTimeString + ' Express started in ' + app.get('env') +
        ' mode on port ' + port +
        '; press Ctrl-C to terminate.')
})
