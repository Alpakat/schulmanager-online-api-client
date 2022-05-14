import getLetters from "./methods/getLetters"
import getSchedules from "./methods/getSchedules"

/**
 * Interface for the SMO Api.
 *
 * @class
 */
export class SchulmanagerAPI {

	#token: string

	/**
* Init the SMO Api
* @exports schulmanager-online-api.default
* @param {string} token - The JWS of your SMO Login.
*/

	constructor(token: string) {
		this.#token = token
	}

	/**
 * Get an overview of all Letters.
 * @return {Object} An Array of the letters
 */

	getLetters() {
		return getLetters({ token: this.#token })
	}

	/**
* Get an overview of the Curren Schedule.
* @return {Object} The Schedule
*/

	getSchedules(dates: { start: string, end: string }, student: { id: number, firstname: string, lastname: string, sex: string, classId: number }) {
		return getSchedules({ token: this.#token, dates: dates, student })
	}

}