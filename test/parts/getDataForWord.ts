var chai = require('chai')
chai.use(require('chai-string'))

import $, * as common from '../helpers/common'

it('fills data for word \'shim\'', async () => {
    await $('#add-card-button').click()
    await $('#word').sendKeys('shim')
    await $('#fill-button').click()
    await common.waitForInputValue('transcription', 'ʃɪm', common.TIMEOUT*2)
}).timeout(common.TIMEOUT*2)