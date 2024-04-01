import axios from 'axios'
import { pathLink } from '../reused'
import { ProfileCardModules } from '../store/modules'
import { Observable } from 'redux'

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
	getProfileDetail(id: number) {
		return instanse.get(`api/users/seller-users/${id}/`)
	},
	getProfileCard(id: number) {
		return instanse.get(`api/products/seller/${id}/products/`)
	},
	getDetailView(id: number) {
		return instanse.get(`api/products/products/${id}/`)
	},
}