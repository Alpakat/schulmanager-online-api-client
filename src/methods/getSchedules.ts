import axios from "axios"
import generateStandartConfig from "../generateStandartConfig"
import { ScheduleResponse } from "../types/scheduleResponse"

export default async function getSchedules({ token, dates, student }: { token: string, dates: { start: string, end: string }, student: { id: number, firstname: string, lastname: string, sex: string, classId: number } }) {

	const data = JSON.stringify(
		{
			"bundleVersion": `3128cbe28328d945ac28`,
			"requests": [
				{
					"moduleName": `schedules`,
					"endpointName": `get-actual-lessons`,
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

	const res = await axios.request<ScheduleResponse>(config)
	const resData = res.data

	try {

		return resData.results[1].data.map(e => { return { classHour: e.classHour, date: e.date, actualLesson: e.actualLesson, originalLesson: e.originalLessons ? e.originalLessons[0] : undefined } })
		// return resData.results[1].data.map(e => { return { classHour: e.classHour, date: e.date, actualLesson: e.actualLesson } })

	} catch (error) {

		return `There was an error, fetching the data. Is your Token correct?`

	}

}