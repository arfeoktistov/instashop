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
	},
	getCategory() {
		return instanse.get(`api/categories/categories/`)
	},
	getSubCategory() {
		return instanse.get(`api/categories/subcategories/`)
	},
}
