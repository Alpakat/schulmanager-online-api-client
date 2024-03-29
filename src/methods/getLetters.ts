import axios from "axios"
import generateStandartConfig from "../generateStandartConfig"
import { LettersResponse } from "../types/lettersResponse"

export default async function getLetters({ token }: { token: string }) {

	const data = JSON.stringify({
		"bundleVersion": `42424242424242424242`,
		"requests": [
			{
				"moduleName": `letters`,
				"endpointName": `get-letters`
			}
		]
	})

	const config = generateStandartConfig({ token, data })

	const res = await axios.request<LettersResponse>(config)
	const resData = res.data

	try {

		return resData.results[0].data.map(e => { return { title: e.title, createdAt: e.createdAt, id: e.id, read: e.studentStatuses[0].readTimestamp } })

	} catch (error) {

		return `There was an error, fetching the data. Is your Token correct?`

	}

}