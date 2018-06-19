var chai = require('chai')
chai.use(require('chai-string'))
var expect = chai.expect

import config from '../../server/config'
import { IncorrectCredentials } from '../../server/res'
import $, { driver, 
    getError,
    signup, 
    gotoSignup, 
    waitForUrl, 
    USER1,
    TIMEOUT,
} from '../helpers/common'

it('redirects to login page because not authenticated', async () => {
    var clientUrl = config.client
    await driver.get(clientUrl + '/cards')
    await waitForUrl('/login', TIMEOUT*2)
}).timeout(TIMEOUT*2)

it('tries to login with non existent user credentials', async () => {
    await $('#name').sendKeys('a')
    await $('#password').sendKeys('a')
    await $('#login-button').click()

    var error = await getError()
    expect(error.message).to.equal(IncorrectCredentials)
})

it('goes to signup page after clicking signup link, expect error to disappear', async () => {
    await gotoSignup()

    var els = await driver.findElements({id: 'error'})
    expect(els.length).to.equal(0)
})

it('goes to login page after signing up', async () => {
    await signup(USER1)
    await waitForUrl('/login')
})