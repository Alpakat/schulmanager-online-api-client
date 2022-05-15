import getLetters from "./methods/getLetters"
import getSchedules from "./methods/getSchedules"
import login from "./methods/login"
import { User } from "./types/loginResponse"

import { JsonDB } from 'node-json-db'
import { Config } from 'node-json-db/dist/lib/JsonDBConfig'

import dotenv from "dotenv"
import getExams from "./methods/getExams"

dotenv.config()

/**
 * Interface for the SMO Api.
 *
 * @class
 */
export class SchulmanagerAPI {

	#token: string | undefined
	#user: User | undefined

	#db: JsonDB | undefined

	/**
* Login to the SMO API
* @exports schulmanager-online-api.default
* @param {storeToken} storeToken - NOT RECOMENDED: if true, token will be stored in a json file. Please use own secure storage and provide token in the login option.
*/

	constructor(storeToken: boolean) {
		if (storeToken) {
			if (!process.env[`IGNORE-UNSAFE-TOKEN-STORAGE`]) {
				console.log(`\x1b[31m`, `SchulmanagerAPI - WARNING! NOT RECOMENDED: Token will be stored in a json file. Please use own secure storage and provide token in the login option. If you want to hide this error use "IGNORE-UNSAFE-TOKEN-STORAGE" as environment variable.`, `\x1b[0m`)
			}
			this.#db = new JsonDB(new Config(`SchulmanagerAPI`, true, false, `/`))
		}
	}


	/**
* Login to the SMO API
* @param {email} email - Email of SMO Login
* @param {password?} password - Password of SMO Login. If not provided, and token is invalid, login will fail.
* @param {token?} token - Token of last Login. Recomended over storeToken of this library. If not given or expired, a new login will be created.
*/

	async login(email: string, password?: string, token?: string) {

		if (this.#db) {
			token = this.#db.exists(`/token/${email}`) ? this.#db.getData(`/token/${email}`) : undefined
		}

		const loginResponse = await login(email, token, password)

		this.#token = loginResponse.token
		this.#user = loginResponse.userData

		if (this.#db) {

			this.#db.push(`/token/${email}`, this.#token)

		}
	}

	/**
 * Get an overview of all Letters.
 * @return {Object} An Array of the letters
 */

	getLetters() {
		if (!this.#token) {
			throw new Error(`Please login first`)

		}
		return getLetters({ token: this.#token })
	}

	/**
* Get an overview of the Curren Schedule.
* @return {Object} The Schedule
*/

	getSchedules(dates: { start: string, end: string }) {
		if (!this.#token || !this.#user) {
			throw new Error(`Please login first`)

		}

		return getSchedules({ token: this.#token, dates: dates, student: this.#user.associatedStudent })
	}

	/**
* Get an overview of the Curren Schedule.
* @return {Object} The Schedule
*/

	getExams(dates: { start: string, end: string }) {
		if (!this.#token || !this.#user) {
			throw new Error(`Please login first`)

		}

		return getExams({ token: this.#token, dates: dates, student: this.#user.associatedStudent })
	}

}