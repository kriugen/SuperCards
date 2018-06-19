import { Signup, Login } from '../../types/Auth'

function log(...args: string[]) {
    args
    //console.log(...args)
}

export const TIMEOUT = 5000

export const CARD1 = { id: 1, word: 'word1' }
export const CARD2 = { id: 2, word: 'word2' }
export const USER1 = {
    id: 1,
    name: 'a',
    email: 'a@a.aa',
    password: 'a',
}

export const USER2 = {
    id: 2,
    name: 'b',
    email: 'b@b.bb',
    password: 'b',
}

const $ = (pattern: string) => driver.findElement({ css: pattern })
export default $

//init
var path = require('path')
process.env.PATH += path.delimiter +
    path.dirname(require('chromedriver').path)

import { until, By, Builder, Condition, WebElement } from 'selenium-webdriver'
import * as chrome from 'selenium-webdriver/chrome'

var opts = new chrome.Options()
opts.setUserPreferences(
    {
        profile: { password_manager_enabled: false },
        credentials_enable_service: false,
    })

opts.addArguments('start-maximized')

export const driver = new Builder()
    .withCapabilities(opts.toCapabilities())
    .build()

export const getError = async () => {
    var el = await waitForId('error')
    var message = await el.findElement(By.id('error-message')).getText()
    var els = await el.findElements(By.css('ul li'))

    if (els.length > 0) {
        var errors: Array<string> = []
        for (let el of els) {
            var text = await el.getText()
            errors.push(text)
        }
    }

    return { message, errors }
}

export const click = (id: string) => {
    log('click', id)
    return driver.findElement(By.id(id)).click()
}

export const waitForId = (id: string) => {
    log('waitForId', id)
    return driver.wait(until.elementLocated(By.id(id)), TIMEOUT)
}

export const waitForIdToDisappear = (id: string) => {
    return driver.wait(new Condition("Waiting for id to disappear", async () => {
        var elements = await driver.findElements(By.id(id))
        return elements.length == 0
    }))
}

export const pause = (delay: number): Promise<void> =>
    new Promise((resolve) => {
        setTimeout(() => resolve(), delay)
    })


export const waitForCss = (css: string) => {
    log('waitForCss', css)
    return driver.wait(until.elementLocated(By.css(css)), TIMEOUT)
}

export const waitForText = async (id: string, text: string) => {
    log('waitForText', id, text)
    var element = await waitForId(id)
    return await driver.wait(until.elementTextIs(element, text), TIMEOUT)
}

export const waitForUrl = (url: string, timeout?: number) => {
    log('waitForUrl', url)

    var regex = new RegExp(url + '$')
    return driver.wait(until.urlMatches(regex), timeout || TIMEOUT)
}

export const waitForInputValue = async (id: string, text: string, timeout?: number) => {
    log('waitForInputValue', id, text)

    var element = await driver.findElement(By.id(id))

    return driver.wait(new Condition("Waiting for attribute value", async () => {
        var attribute = await element.getAttribute('value')
        return attribute == text
    }), timeout || TIMEOUT)
}

export const waitForElements = async (condition: Condition<WebElement[]>) => {
    return driver.wait(condition)
}

export const gotoSignup = async () => {
    await click('signup-link')
    await waitForUrl('signup')
}

export const signup = async (signupInfo: Signup) => {
    await $('#name').sendKeys(signupInfo.name)
    await $('#email').sendKeys(signupInfo.email)
    await $('#password').sendKeys(signupInfo.password)
    await $('#signup-button').click()
    return await waitForId('login-button')
}

export const addCard = async (word: string) => {
    await $('#add-card-button').click()
    await $('#word').sendKeys(word)
    return await saveCard()
}

export const saveCard = async () => {
    await $('#save-card-button').click()
    return await waitForId('edit-card-button')
}

export const gotoEditCard = async () => {
    await $('#edit-card-button').click()
    return await waitForId('save-card-button')
}

export const gotoProfile = async () => {
    await $('#username-button').click()
    await waitForUrl('profile')
}

export const gotoCards = async () => {
    await driver.findElement({ id: 'cards-link' }).click()
    await waitForUrl('cards')
}

export const takeCard = async () => {
    await $('#take-card-button').click()
    return await waitForId('next-card-button')
}

export const login = async (loginInfo: Login) => {
    await $('#name').sendKeys(loginInfo.name)
    await $('#password').sendKeys(loginInfo.password)
    await $('#login-button').click()
    return await waitForId('username-button')
}

export const logout = async () => {
    await $('#logout-button').click()
    return await waitForId('login-button')
}

export const gotoSearch = async () => {
    await $('#search-link').click()
    await waitForUrl('search')
}

export const searchFor = async (word: string) => {
    await $('#word').sendKeys(word)
    await $('#search-button').click()
    return await waitForId('search-results')
}

export const prependSymbol = (text: string, symbol: string) => {
    if (symbol.length != 1)
        throw 'symbol length must be 1'
    return (symbol + text).slice(-2)
}