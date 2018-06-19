var chai = require('chai')
chai.use(require('chai-string'))
var expect = chai.expect
import { until, By } from 'selenium-webdriver'

import
$, {
    driver,
    getError,
    CARD1,
    CARD2,
    addCard,
    saveCard,
    gotoEditCard,
    gotoCards,
    waitForId,
    waitForText,
    waitForUrl,
    waitForCss,
    pause,
    waitForElements,
    TIMEOUT,
} from '../helpers/common'

import { SmallText } from '../../server/meta'

it('USER1 tries to enter too long word', async () => {
    var word = '#'.repeat(SmallText + 1)
    var button = await waitForId('add-card-button')
    await button.click()
    await $('#word').sendKeys(word)
    await $('#save-card-button').click()

    var error = await getError()
    expect(error.errors.length).to.equal(1)
    expect(error.errors[0]).to.equal(`word max length ${SmallText}, actual length ${word.length}`)
})

it('goto cards, expect error message to disappear', async () => {
    await gotoCards()
    var els = await driver.findElements({ id: 'error' })
    expect(els.length).to.equal(0)
})

it('USER1 adds CARD1', async () => {

    await addCard(CARD1.word)
    await waitForUrl('/cards/view/' + CARD1.id)

    var cardWord = await driver.findElement({ id: 'card-word' }).getText()
    expect(cardWord).to.equal(CARD1.word)
})

it('USER1 edits CARD1', async () => {
    await gotoEditCard()

    const TRANSCRIPTION = 'card1 transcription'
    await $('#transcription').sendKeys(TRANSCRIPTION)

    await saveCard()
    await waitForUrl('/cards/view/' + CARD1.id)

    var cardTranscription = await driver.findElement({ id: 'card-transcription' }).getText()
    expect(cardTranscription).to.equal(TRANSCRIPTION)
})

it('adds another card CARD2', async () => {
    await gotoCards()
    await addCard(CARD2.word)
    await waitForUrl('/cards/view/' + CARD2.id)

    var cardWord = await driver.findElement({ id: 'card-word' }).getText()
    expect(cardWord).to.equal(CARD2.word)
})

it('goes to the next card CARD1', async () => {
    var card2Url = config.client + '/cards/view/' + CARD2.id
    await driver.get(card2Url)
    await waitForUrl(card2Url)

    await waitForId('next-card-button')
    await driver.findElement({ id: 'next-card-button' }).click()
    await waitForUrl('/view/' + CARD1.id)
    var element = await driver.wait(until.elementLocated(By.id('card-word')), TIMEOUT)
    var word = await element.getText()
    expect(word).to.equal(CARD1.word)
})

it('goes back to CARD2 using browser back button', async () => {
    await driver.navigate().back()
    await waitForUrl('/cards/view/' + CARD2.id)
    await waitForText('card-word', CARD2.word)
})

it('goes forward to CARD1 using browser forward button', async () => {
    await driver.navigate().forward()
    await waitForUrl('/cards/view/' + CARD1.id)
    await waitForText('card-word', CARD1.word)
})

it('learns CARD1 and jumps to next card CARD2', async () => {
    await driver.findElement({ id: 'learned-card-button' }).click()

    await waitForUrl('/view/' + CARD2.id)
    var element = await driver.wait(until.elementLocated(By.id('card-word')), TIMEOUT)
    var cardWord = await element.getText()
    expect(cardWord).to.equal(CARD2.word)
})

it('stays on current card on next click when all other cards are learned', async () => {
    await driver.findElement({ id: 'next-card-button' }).click()
    await pause(2000) //ugly, but how else to make sure nothing changes?
    await waitForUrl('/cards/view/' + CARD2.id)

    var element = await driver.wait(until.elementLocated(By.id('card-word')), TIMEOUT)
    var cardWord = await element.getText()
    expect(cardWord).to.equal(CARD2.word)
})

it('learns last card', async () => {
    await driver.findElement({ id: 'learned-card-button' }).click()
    await waitForId('repeat-card-button')
    var cardWord = await driver.findElement({ id: 'card-word' }).getText()
    expect(cardWord).to.equal(CARD2.word)
})

import config from '../../server/config'
it('goes to CARD1 through url', async () => {
    await driver.get(config.client + '/cards/view/' + CARD1.id)
    var el = await waitForId('card-word')
    var cardWord = await el.getText()
    expect(cardWord).to.equal(CARD1.word)
})

it('adds CARD3', async () => {
    await gotoCards()
    waitForId('add-card-button')
    await addCard('word3')
})

it('loads learned cards, goes back and forward using browser buttons', async () => {
    await gotoCards()
    var cardsLearned = config.client + '/cards/learned'
    await driver.get(cardsLearned)
    var css = 'ul#item-list li'
    await waitForCss(css)
    await driver.navigate().back()
    await waitForUrl('/cards')
    await driver.navigate().forward()

    await waitForUrl('/cards/learned')
})

import { Condition } from 'selenium-webdriver'
it('checks learned cards and opens CARD2', async () => {
    var css = 'ul#item-list li'
    let elements = await waitForElements(new Condition("Learned cards list", async (driver) => {
        let items = await driver.findElements(By.css(css))
        if (items.length == 2) {
            var word1 = await items[0].getText()
            var word2 = await items[1].getText()

            if (word1 == CARD1.word
                && word2 == CARD2.word)
                return items
        }

        return null
    }))

    await elements[1].click()
})

const NewWord = 'word2n'
it('edits CARD2 and goes back to learned cards', async () => {
    var btnEdit = await waitForId('edit-card-button')
    await btnEdit.click()

    await $('#word').sendKeys('n')
    await $('#save-card-button').click()

    await waitForText('card-word', NewWord)
    var back = await waitForId('back-button')
    await back.click()
})

it('checks edited word and url', async () => {
    await waitForUrl('/cards/learned')
    var css = 'ul#item-list li'
    await waitForCss(css)
    var items = await driver.findElements(By.css(css))
    expect(items.length).to.be.equal(2)
    var word = await items[1].getText()
    expect(word).to.be.equal(NewWord)
})

it('goes to new cards and clicks on CARD3', async () => {
    var cardsUrl = config.client + '/cards/new'
    await driver.get(cardsUrl)

    var css = 'ul#item-list li'
    await waitForCss(css)
    var items = await driver.findElements(By.css(css))
    expect(items.length).to.be.equal(1)
    var word = await items[0].getText()
    expect(word).to.be.equal('word3')

    await items[0].click()
})

it('deletes CARD3', async () => {
    var btnDelete = await waitForId('delete-card-button')
    await btnDelete.click()
    var btnOk = await waitForId('modal-ok')
    await btnOk.click()
    await waitForUrl('/cards/new', TIMEOUT * 2)
    await gotoCards()
    await waitForUrl('/cards', TIMEOUT * 2)
    var css = 'ul#item-list li'
    await waitForCss(css)
    var items = await driver.findElements(By.css(css))
    for (let item of items) {
        var text = await item.getText()
        expect(text).to.not.be.equal('word3')
    }
}).timeout(TIMEOUT * 5)