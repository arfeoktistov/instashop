import axios from 'axios'
import { pathLink } from '../reused'
import { UserLogin } from '../store/modules'

const instanse = axios.create({
	baseURL: pathLink,
	headers: {
		'Content-Type': 'application/json',
	},
})

export const storesApi = {
	getAllStores() {
		return instanse.get(`/api/users/seller-users/`)
	},
	getCategory() {
		return instanse.get(`/api/categories/categories/`)
	},
	getSubCategory() {
		return instanse.get(`/api/categories/subcategories/`)
	},
	addNewUser(getUser: UserLogin) {
		return instanse.post(`/api/users/token/`, getUser)
	},
}
