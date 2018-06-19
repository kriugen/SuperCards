var chai = require('chai')
chai.use(require('chai-string'))

var db = require('../database/util')
import {
    driver,
    login,
    logout,
    waitForUrl,
    USER1,
    waitForId,
} from './helpers/common'

before(() => {
    db.cleanup()
})

after(() => driver.quit())

describe('Cards', () => {
    require('./parts/signup') //signup USER1

    it('logs in', async () => {
        await login(USER1)
        await waitForId('add-card-button')
    })

    require('./parts/cards') //add card1, card2, learn card2
    require('./parts/search') //add user2, search card1, take card1
    require('./parts/pagination')
    require('./parts/getDataForWord')

    it('log out', async () => {
        await logout()
        await waitForUrl('/login')
    })
})

