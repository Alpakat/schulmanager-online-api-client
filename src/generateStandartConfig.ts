import { AxiosRequestConfig } from "axios"

export default function generateStandartConfig({ token, data }: { token: string, data: string }) {

	const config: AxiosRequestConfig = {
		method: `post`,
		url: `https://login.schulmanager-online.de/api/calls`,
		headers: {
			"Authorization": `Bearer ${token}`,
			"Content-Type": `application/json`
		},
		timeout: 5000,
		data: data
	}
	
	return config

}