var chai = require('chai')
chai.use(require('chai-string'))
var expect = chai.expect

import
$,
{
    driver,
    gotoSearch,
    searchFor,
    waitForCss,
    CARD1,
} from '../helpers/common'

const firstFoundElementText = async () => {
    var css = '#search-results li'
    await waitForCss(css)
    var searchResults = await driver.findElements({ css })
    expect(searchResults.length).to.equal(1)
    var cardLink = searchResults[0]
    return await cardLink.getText()
}
it('searches for CARD1', async () => {
    await gotoSearch()
    await searchFor(CARD1.word)
    var found = await firstFoundElementText()
    expect(found.startsWith(CARD1.word)).to.be.true
})

it('clears search box', async () => {
    await $('#clear-search-button').click()
    var search = await $('#word').getAttribute('value')
    expect(search).to.equal('')
})


