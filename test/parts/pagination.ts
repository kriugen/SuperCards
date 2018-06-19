var chai = require('chai')
chai.use(require('chai-string'))
var expect = chai.expect

var dbUtil = require('../../database/util')
var db = require('../../server/db')

import 
    { driver,
    USER1,
    login,
    logout,
    waitForCss,
    prependSymbol,
} from '../helpers/common'

const { CardsPerPage } = require('../../client/config')
const PAGE_COUNT = 3

it('checks number of pages on cards page', async () => {
    await logout()
    await dbUtil.cleanup('cards')
    const TOTAL_CARDS_COUNT = PAGE_COUNT * CardsPerPage
    for (var i = 1; i <= TOTAL_CARDS_COUNT; ++i) {
        await db.insert('cards', { word: 'test' + prependSymbol(i.toString(), '0'), user_id: USER1.id })
    }

    await login(USER1)
    var css = '.pagination li'
    await waitForCss(css)
    var pages = await driver.findElements({ css })
    expect(pages.length).to.equal(PAGE_COUNT + 2)
    var classes = await pages[1].getAttribute('class')
    expect(classes).contains('active')
})

it('page switch on cards page', async () => {
    var pages = await driver.findElements({ css: '.pagination li' })
    await pages[2].click()
    var cards = await driver.findElements({ css: '#item-list li' })
    var text = await cards[0].getText()
    expect(text).equals('test' + prependSymbol((CardsPerPage + 1).toString(), '0'))
})
