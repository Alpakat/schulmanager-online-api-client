import { Crypto } from "@peculiar/webcrypto"
import axios from "axios"
import { loginResponse } from "../types/loginResponse"
import { loginStatusResponse } from "../types/loginStatusResponse"

const crypto = new Crypto()

export default async function login(email: string, token?: string, password?: string) {
	if (token) {
		const loginStatus = await api_checkLoginStatus(token)
		if (loginStatus.data.isAuthenticated) {
			return { token: loginStatus.headers[`x-new-bearer-token`] || token, userData: loginStatus.data.user }
		}
	}
	if (!password) {
		throw new Error(`Login failed. Please provide password.`)
	}
	const loginResponse = await api_login(email, password)
	return { token: loginResponse.jwt, userData: loginResponse.user }
}

async function api_checkLoginStatus(token: string) {

	try {
		const res = await axios.post<loginStatusResponse>(`https://login.schulmanager-online.de/api/login-status`, {}, { headers: { "Authorization": `Bearer ` + token } })
		return res
	} catch (error) {
		throw new Error(`Error checking login status`)
	}

}

async function api_getSalt(email: string) {

	try {
		const res = await axios.post(`https://login.schulmanager-online.de/api/get-salt`, { "emailOrUsername": email, "institutionId": null })
		return res.data
	} catch (error) {
		throw new Error(`Error getting salt`)
	}

}

async function hashPasswordWithSalt(password: string, salt: string, iterations: number) {

	const binaryBuffer = Buffer.from(password, `binary`)

	const baseKey = await crypto.subtle.importKey(`raw`, binaryBuffer, {
		name: `PBKDF2`
	}, false, [`deriveBits`])

	const algorithm = {
		name: `PBKDF2`,
		hash: `SHA-512`,
		salt: (new TextEncoder).encode(salt),
		iterations: iterations
	}

	const length = 4096

	const s = await crypto.subtle.deriveBits(algorithm, baseKey, length)

	const array = new Uint8Array(s)

	const hash = Buffer.from(array).toString(`hex`)

	return hash
}

async function api_login(email: string, password: string) {

	try {
		const res = await axios.post<loginResponse>(`https://login.schulmanager-online.de/api/login`, { "emailOrUsername": email, "password": password, "mobileApp": false, "institutionId": null })
		return res.data
	} catch (error) {
		throw new Error(`Error logging in`)
	}

}