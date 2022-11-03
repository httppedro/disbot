/* eslint-disable no-undef */
const puppeteer = require('puppeteer')

class scrapingCoins {

	constructor(coinType) {

		this.coinType = coinType

	}

	async get () {

		const browser = await puppeteer.launch()
		const page = await browser.newPage()

		const priceValues = await getValues(page, this.coinType)

		return priceValues


		async function getValues (page, coinType) {

			try {

				await page.goto(`https://coinmarketcap.com/currencies/${coinType}/`)

				const ValueDolar = await page.evaluate(() => document.querySelector('.priceValue ').textContent)
				const nameSymbol = await page.evaluate(() => document.querySelector('.nameSymbol').textContent)

				await page.goto(`https://coinmarketcap.com/pt-br/currencies/${coinType}/`)

				const ValueBRL = await page.evaluate(() => document.querySelector('.priceValue ').textContent)

				await browser.close()

				const { priceValueDolar, priceValueBRL } = formatValue(ValueDolar, ValueBRL)

				return { priceValueDolar, priceValueBRL, nameSymbol }

			} catch (err) {

				return false

			}
		}

		function formatValue (priceValueDolar, priceValueBRL) {

			if (priceValueDolar > 0.01 || priceValueBRL > 0.01) {

				priceValueDolar = priceValueDolar.toLocaleString('en-us', { style: 'currency', currency: 'USD' })
				priceValueBRL = priceValueBRL.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })

				return { priceValueDolar, priceValueBRL }

			}

			return { priceValueDolar, priceValueBRL }
		}
	}

module.exports = scrapingCoins
