const https = require('https')
const httpSignature = require('http-signature')

const makeJSONRequest = (options, { key, keyId }) => {
	return new Promise((resolve, reject) => {
		const handler = (response) => {
			const body = []
			response.on('data', (chunk) => body.push(chunk))
			response.on('end', () => {
				const str = body.join('')
				try {
					const data = JSON.parse(str)
					if (response.statusCode > 302) {
						reject(data)
					} else {
						resolve(data)
					}
				} catch (e) {
					e.statusCode = response.statusCode
					e.body = str
					reject(e)
				}
			})
		}

		const request = https.request(options, handler)

		if (key) {
			httpSignature.sign(request, {
				key,
				keyId,
			})
		}

		request.on('error', (err) => reject(err))

		request.end(options.body)
	})
}

module.exports = makeJSONRequest