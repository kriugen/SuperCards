import { JSDOM } from 'jsdom'
import * as request from 'superagent'

import { Card } from '../../types/Card'

interface SuperAgentParseFix extends request.SuperAgentStatic {
    parse: any
}

var requestFixed = request as SuperAgentParseFix

export function getData(word: string): Promise<Card> {
    return new Promise((resolve, reject) => {
        word = word.toLowerCase()
        const host = 'http://dictionary.cambridge.org'
        const url = `${host}/dictionary/english/${word}`
        request
            .get(url)
            .then((r: any) => {
                let card = new Card()
                card.word = word
                card.url = url

                let data = parse(r.text, card)
                var audioUri = data.audioUri

                if (!audioUri) {
                    resolve(card)
                    return
                }

                if (audioUri[0] == '/')
                    audioUri = `${host}/${audioUri}`

                request
                    .get(audioUri)
                    .buffer(true)
                    .parse(requestFixed.parse['application/octet-stream'])
                    .then((r: any) => {
                        card.sound = 'data:audio/mp3;base64,' + r.body.toString('base64')
                        resolve(card)
                    })
                    .catch((e: any) => reject(e))
            })
            .catch((e: any) => reject(e))
    })
}

const parse = (wordHtmlData: string, card: Card) => {
    const { document } = (new JSDOM(wordHtmlData)).window

    var audioUrlAttr = 'data-src-mp3'

    var audio = document.querySelector(`[${audioUrlAttr}]`)
    var audioUri = audio && audio.getAttribute(audioUrlAttr)

    var samplesElement = document.querySelectorAll('span[title="Example"]')
    card.samples = parseMultiline(samplesElement,
        s => s.innerHTML.replace(/<(?:.|\n)*?>/gm, ''))

    var transcriptionElement = document.querySelector('span .ipa, span[pron-region="US"]')
    if (transcriptionElement) {
        card.transcription = transcriptionElement.textContent
    }

    var translationElement = document.querySelectorAll('.def')
    card.translation = parseMultiline(translationElement, t => t && t.textContent)

    return { audioUri }
}

function parseMultiline(samples: NodeListOf<Element>,
    itemParser: (s: Element) => string) {
    var result: string[] = []
    samples.forEach(s => {
        var r = itemParser(s)
        if (r)
            result.push(r)
    })

    return result.join('\r\n')
}
