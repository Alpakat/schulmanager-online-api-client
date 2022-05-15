import axios from "axios"
import generateStandartConfig from "../generateStandartConfig"
import { examsResponse } from "../types/examsResponse"

export default async function getExams({ token, dates, student }: { token: string, dates: { start: string, end: string }, student: { id: number, firstname: string, lastname: string, sex: string, classId: number } }) {

	const data = JSON.stringify(
		{
			"bundleVersion": `3128cbe28328d945ac28`,
			"requests": [
				{
					"moduleName": `exams`,
					"endpointName": `get-exams`,
					"parameters":
					{
						"student": student,
						"start": dates.start, //2022-01-10
						"end": dates.end //2022-01-16
					}
				}
			]
		})

	const config = generateStandartConfig({ token, data })

	const res = await axios.request<examsResponse>(config)
	const resData = res.data

	try {

		return resData.results[0].data.map(e => { return { subject: {name: e.subject.name, abbreviation: e.subject.abbreviation}, comment: e.comment, createdAt: e.createdAt, updatedAt: e.updatedAt, date: e.date, startClass: e.startClassHour.number, endClass: e.endClassHour.number } })
		// return resData.results[1].data.map(e => { return { classHour: e.classHour, date: e.date, actualLesson: e.actualLesson } })

	} catch (error) {

		return `There was an error, fetching the data. Is your Token correct?`

	}

}