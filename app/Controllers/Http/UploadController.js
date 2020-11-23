'use strict'

const Drive = use('Drive')
const Helpers = use('Helpers')
const File = use('App/Models/File')

const fetch = require('node-fetch')

class UploadController {
	async upload({ request }) {
		let ts = new Date().valueOf()

		const data = request.multipart.file('file', {}, async (file) => {
			await Drive.disk('spaces').put(
				ts.toString() + '.' + file.extname.toLowerCase().trim(),
				file.stream,
				{
					ACL: "public-read",
				})

			const uploadedName = await Drive.disk('spaces').getUrl(ts + file.clientName)

			const files = new File()

			files.filename = uploadedName

			await files.save()
		})

		await request.multipart.process()
	}

	async getFile({ view }) {

		return view.render('list')
	}

	async listFiles({ view }) {
		const data = await fetch('https://crono.ams3.digitaloceanspaces.com/')

		return view.render('data', { data })
	}

	async deleteFile({ response }) {
		const res = Drive.disk('spaces').delete('1592070778232')

		if (res) {
			return response.json({ status: 'success', returned: res })
		}
	}
}

module.exports = UploadController