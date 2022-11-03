
const express = require('express')

class Server {

	constructor() {

		this.app = express()
		this.router = express.Router()
		this.port = process.env.PORT || 8080

	}

	start () {

		this.router.get('/', (req, res) => {

			res.send('Bot Online!')

		})

		this.app.get('/')

		this.app.use('/', this.router)
		this.app.listen(this.port, () => {

			console.log(`Server Listen on ${this.port}`)

		})

	}

}

module.exports = Server
