const cron = require('node-cron')
const fetch = require('node-fetch')

const Bot = require('./services/bot')
const Server = require('./server')


new Server().start()
const bot = new Bot()

const url = 'https://coin-catcherbot.herokuapp.com/'

cron.schedule('* * 24 * * *', () => {

	fetch(url).then(res => res)

})

cron.schedule('0 */2 * * *', () => {

	bot.autoSendCoinValues()

})

bot.sendCoinValues()

