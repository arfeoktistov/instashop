import axios from 'axios'

const instanse = axios.create({
	baseURL: 'http://45.90.35.207:8080/api/',
	headers: {
		'Content-Type': 'application/json',
	},
})

export const authApi = {
	getProfileDetail(id: number) {
		return instanse.get(`users/seller-users/${id}/`)
	},
}
