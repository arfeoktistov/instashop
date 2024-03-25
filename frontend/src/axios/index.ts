import axios from 'axios'

const instanse = axios.create({
	baseURL: '',
	headers: {
		'Content-Type': 'application/json',
	},
})

export const authApi = {}
