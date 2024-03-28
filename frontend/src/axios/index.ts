import axios from 'axios'
import { pathLink } from '../reused'

const instanse = axios.create({
	baseURL: pathLink,
	headers: {
		'Content-Type': 'application/json',
	},
})

export const storesApi = {
	getAllStores() {
		return instanse.get(`api/users/seller-users/`)
	}
}