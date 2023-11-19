import axios from 'axios'

export const axiosClient = () => {
	const url = () => {
		if (process.env.VERCEL_URL || process.env.NEXT_PUBLIC_VERCEL_URL) {
			// return `https://${
			// 	process.env.VERCEL_URL || process.env.NEXT_PUBLIC_VERCEL_URL
			// }`
			return undefined
		}
		return `http://localhost:${process.env.PORT || 3000}`
	}
	return axios.create({ baseURL: url() })
}
