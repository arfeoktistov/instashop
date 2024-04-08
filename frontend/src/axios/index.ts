import axios from 'axios'
import { pathLink } from '../reused'
import { UserLogin } from '../store/modules'
import { IProductsCat, IForAddProduct, IIdToken, IForChangeProduct, IIdTokenShopUser } from '../store/modules'

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
	getStoresByCategory(cat_id: string, sub_id: string = '') {
		return instanse.get(`/api/categories/categories/${cat_id}/sellers/?subcategory_id=${sub_id}`)
	},
	getProfileDetail(id: number) {
		return instanse.get(`/api/users/seller-users/${id}/`)
	},
	getProfileCard(id: number) {
		return instanse.get(`/api/products/seller/${id}/products/`)
	},
	getDetailView(id: number) {
		return instanse.get(`/api/products/products/${id}/`)
	},
	getStoreCategories(id: number) {
		return instanse.get(`/api/categories/sellers/${id}/categories/`)
	},
	getProductsByCategory({ id, cat_id, sub_id }: IProductsCat) {
		return instanse.get(`/api/products/seller/${id}/products/${id}/products_by_category/?category_id=${cat_id}&subcategory_id=${sub_id}`)
	},
	getTokenUser(token: string) {
		const headers = { "Authorization": `Bearer ${token}` }
		return instanse.get('/api/users/users/token/user-id/', { headers })
	},
	changeTokenUser({ id, seller_user, token }: IIdTokenShopUser) {
		const headers = { "Authorization": `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
		return instanse.put(`/api/users/seller-users/${id}/`, seller_user, { headers })
	},
	AddNewProduct({ productCard, token }: IForAddProduct) {
		const headers = { "Authorization": `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
		return instanse.post('/api/products/products/', productCard, { headers })
	},
	changeProduct({ productCard, token, id }: IForChangeProduct) {
		const headers = { "Authorization": `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
		return instanse.put(`/api/products/products/${id}/`, productCard, { headers })
	},
	deleteProduct({ id, token }: IIdToken) {
		const headers = { "Authorization": `Bearer ${token}` }
		return instanse.delete(`/api/products/products/${id}/`, { headers })
	}
}
