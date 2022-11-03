const Fetch = require('node-fetch')
require('dotenv').config()

class apiCoins {

	constructor(coinType) {

		this.coinType = coinType

	}

	async get () {

		const API_KEY = process.env.API_KEY // API KEY FROM https://pro.coinmarketcap.com/
		const baseUrl = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest'
		const symbol = `?&symbol=${this.coinType}`

		const completeUrl = baseUrl + symbol
		const nameSymbol = this.coinType.toUpperCase()

		const parameters = {

			headers: { 'X-CMC_PRO_API_KEY': API_KEY },

		}

		const priceValues = await getValues(completeUrl, parameters, nameSymbol)

		return priceValues


		async function getValues (completeUrl, parameters, nameSymbol) {

			try {

				const ValueDolar = await Fetch(completeUrl, parameters)
					.then(response => response.json()
						.then(dataCoins => dataCoins.data[nameSymbol].quote.USD.price))


				const ValueBRL = await Fetch(completeUrl + '&convert=BRL', parameters)
					.then(response => response.json()
						.then(dataCoins => dataCoins.data[nameSymbol].quote.BRL.price))


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

}

module.exports = apiCoins
