import axios from "axios"
import generateStandartConfig from "../generateStandartConfig"
import infoResponse from "../types/infoResponse"

export default async function getInfo({ token }: { token: string }) {

	const data = JSON.stringify(
		{ "bundleVersion": `42424242424242424242`, "requests": [{ "moduleName": null, "endpointName": `get-new-notifications-count` }, { "moduleName": null, "endpointName": `poqa`, "parameters": { "action": { "model": `modules/detention/detention-event-attendance`, "action": `findAll`, "parameters": [{ "attributes": [`id`, `durationInMinutes`, `wasAbsent`, `studentId`, `confirmed`], "where": { "studentId": { "$in": [491111] } }, "include": [{ "association": `detentionEvent`, "attributes": [`id`, `date`, `startTime`], "required": true, "where": { "date": { "$gte": `2022-09-15` } } }, { "association": `student`, "attributes": [`id`, `firstname`, `lastname`], "required": true }] }] } } }, { "moduleName": `schedules`, "endpointName": `get-substitution-texts-for-widget` }, { "moduleName": `messenger`, "endpointName": `chat-is-visible` }, { "moduleName": null, "endpointName": `exams-visible-for-students` }, { "moduleName": null, "endpointName": `get-tiles` }, { "moduleName": null, "endpointName": `event-category-exists` }, { "moduleName": null, "endpointName": `poqa`, "parameters": { "action": { "model": `modules/invoicing/student-invoice`, "action": `findAll`, "parameters": [{ "attributes": [`id`, `sum`, `generalInvoiceId`, `studentId`], "include": [{ "association": `generalInvoice`, "required": true, "attributes": [`id`, `number`, `date`, `dueDate`], "where": { "$or": [{ "createdAt": { "$lt": `2021-10-18` } }, { "sentTimestamp": { "$not": null } }] } }, { "association": `items`, "attributes": [`id`, `amount`, `invoiceId`, `studentId`], "required": true, "include": [{ "association": `generalItem`, "required": true, "attributes": [`id`, `name`] }] }], "where": { "sentTimestamp": { "$not": null }, "paid": false, "studentId": { "$in": [491111] } } }] } } }, { "moduleName": null, "endpointName": `get-unread-letters-for-widget` }, { "moduleName": null, "endpointName": `poqa`, "parameters": { "action": { "model": `modules/electives/election`, "action": `findAll`, "parameters": [{ "where": { "start": { "$lte": `2022-09-15T08:40:27.205Z` }, "end": { "$gte": `2022-09-15T08:40:27.205Z` } } }] } } }, { "moduleName": null, "endpointName": `poqa`, "parameters": { "action": { "model": `modules/electives/election`, "action": `findAll`, "parameters": [{ "where": { "finalized": true, "end": { "$gte": `2022-06-15` } }, "include": [{ "association": `electives`, "required": true, "include": [{ "association": `instances`, "required": true, "include": [{ "association": `studentAssignments`, "required": true, "where": { "studentId": { "$in": [491111] } } }, { "association": `elective`, "required": true }, { "association": `slots`, "required": false }] }] }] }] } } }, { "moduleName": null, "endpointName": `get-unexcused-sick-notes` }, { "moduleName": null, "endpointName": `get-current-conferences` }] })

	const config = generateStandartConfig({ token, data })

	const res = await axios.request<infoResponse>(config)
	const resData = res.data

	try {

		return resData
		// return resData.results[1].data.map(e => { return { classHour: e.classHour, date: e.date, actualLesson: e.actualLesson } })

	} catch (error) {

		return `There was an error, fetching the data. Is your Token correct? ${error}`

	}

}