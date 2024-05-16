import axios from 'axios'
import { pathLink } from '../reused'
import { FeedbackData, UserLogin } from '../store/modules'
import { IProductsCat, IForAddProduct, IIdToken, IForChangeProduct, IIdTokenShopUser } from '../store/modules'

const instance = axios.create({
	baseURL: pathLink,
	headers: {
		'Content-Type': 'application/json',
	},
})


export const storesApi = {
	getAllStores() {
		return instance.get(`/api/users/seller-users/`)
	},
	getCategory() {
		return instance.get(`/api/categories/categories/`)
	},
	getSubCategory() {
		return instance.get(`/api/categories/subcategories/`)
	},
	addNewUser(getUser: UserLogin) {
		return instance.post(`/api/users/token/`, getUser)
	},
	getStoresByCategory(cat_id: string, sub_id: string = '') {
		return instance.get(`/api/categories/categories/${cat_id}/sellers/?subcategory_id=${sub_id}`)
	},
	getProfileDetail(id: number) {
		return instance.get(`/api/users/seller-users/${id}/`)
	},
	getProfileCard(id: number) {
		return instance.get(`/api/products/seller/${id}/products/`)
	},
	getDetailView(id: number) {
		return instance.get(`/api/products/products/${id}/`)
	},
	getStoreCategories(id: number) {
		return instance.get(`/api/categories/sellers/${id}/categories/`)
	},
	getProductsByCategory({ id, cat_id, sub_id }: IProductsCat) {
		return instance.get(`/api/products/seller/${id}/products/products-by-category/?category_id=${cat_id}&subcategory_id=${sub_id}`)
	},
	getTokenUser(token: string) {
		const headers = { "Authorization": `Bearer ${token}` }
		return instance.get('/api/users/users/token/user-id/', { headers })
	},
	changeTokenUser({ id, seller_user, token }: IIdTokenShopUser) {
		const headers = { "Authorization": `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
		return instance.put(`/api/users/seller-users/${id}/`, seller_user, { headers })
	},
	AddNewProduct({ productCard, token }: IForAddProduct) {
		const headers = { "Authorization": `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
		return instance.post('/api/products/products/', productCard, { headers })
	},
	changeProduct({ productCard, token, id }: IForChangeProduct) {
		const headers = { "Authorization": `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
		return instance.put(`/api/products/products/${id}/`, productCard, { headers })
	},
	deleteProduct({ id, token }: IIdToken) {
		const headers = { "Authorization": `Bearer ${token}` }
		return instance.delete(`/api/products/products/${id}/`, { headers })
	},
	getInfo() {
		return instance.get(`/api/info/footerinfo/`)
	},
	newFeedback(data: FeedbackData) {
		return instance.post(`/api/info/applications/`, data)
	}
}
