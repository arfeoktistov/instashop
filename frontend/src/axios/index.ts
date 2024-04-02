import axios from 'axios'
import { pathLink } from '../reused'
import { ProfileCardModules, IProductsCat } from '../store/modules'
import { Observable } from 'redux'

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
	getStoresByCategory(cat_id: string, sub_id: string = '') {
		return instanse.get(`/api/categories/categories/${cat_id}/sellers/?subcategory_id=${sub_id}`)
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
	getStoreCategories(id: number) {
		return instanse.get(`/api/categories/sellers/${id}/categories/`)
	},
	getProductsByCategory({ id, cat_id, sub_id }: IProductsCat) {
		return instanse.get(`/api/products/seller/${id}/products/${id}/products_by_category/?category_id=${cat_id}&subcategory_id=${sub_id}`)
	}
}
