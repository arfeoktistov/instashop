import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { storesApi } from '../../axios'
import { IAddProductsCard, ICategory, ProfileCardModules } from '../modules'

type UserState = {
	loading: boolean
	reboot: boolean
	error: null | string
	category: ICategory[]
	profileCard: ProfileCardModules[]
}

const initialState: UserState = {
	error: null,
	loading: false,
	reboot: false,
	category: [],
	profileCard: [],
}
// Получение список категории
export const fetchByAllCategory = createAsyncThunk<ICategory[], void, { rejectValue: string }>(
	'product/fetchByAllCategory', async (_, { rejectWithValue }) => {
		const res = await storesApi.getCategory()
		// console.log(res)
		if (res.status !== 200) {
			return rejectWithValue('Server Error')
		}
		return res.data
	})

// Получение список карточек
export const fetchByGetCard = createAsyncThunk<ProfileCardModules[], number, { rejectValue: string }>(
	'product/fetchByGetCard', async (id, { rejectWithValue }) => {
		const res = await storesApi.getProfileCard(id)
		// console.log(res)
		if (res.status !== 200) {
			return rejectWithValue('Server error')
		}
		return res.data
	})
// Для добавления карточек
export const fetchByAddNewCard = createAsyncThunk<void, IAddProductsCard, { rejectValue: string }>(
	'product/fetchByAddNewCard', async (productCard, { rejectWithValue }) => {
		const res = await storesApi.AddNewProduct(productCard)
		console.log(res)
		// if (res.status !== 200) {
		// 	return rejectWithValue('Server error')
		// }
		// return res.data
	})

// Для удаления карточек
export const fetchByDeleteCard = createAsyncThunk<void, number, { rejectValue: string }>(
	'product/fetchByDeleteCard', async (id, { rejectWithValue }) => {
		const res = await storesApi.deleteNewProduct(id)
		console.log(res)
		if (res.status !== 204) {
			return rejectWithValue('Server error')
		}
	})

const addProductSlice = createSlice({
	name: 'product',
	initialState,
	reducers: {},
	extraReducers: ({ addCase }) => {
		addCase(fetchByAllCategory.pending, state => {
			state.loading = true
			state.error = null
		})
		addCase(fetchByAllCategory.fulfilled, (state, action) => {
			state.category = action.payload
			state.loading = false
		})
		addCase(fetchByAllCategory.rejected, (state, action) => {
			state.loading = false
			if (action.error.message?.includes('400')) {
				state.error = 'Упс что то пошло не так!'
			}
		})
		// =======================
		addCase(fetchByGetCard.pending, (state) => {
			state.loading = true
			state.error = null
		})

		addCase(fetchByGetCard.fulfilled, (state, action) => {
			state.profileCard = action.payload
			state.loading = false
		})

		addCase(fetchByGetCard.rejected, (state, action) => {
			state.loading = false
			if (action.error.message?.includes('401')) {
				state.error = 'Упс что-то пошло не так!'
			}
		})
		// =======================
		addCase(fetchByAddNewCard.pending, (state) => {
			state.loading = true
			state.error = null
		})

		addCase(fetchByAddNewCard.fulfilled, (state, action) => {
			// state.profileCard = action.payload
			state.loading = false
		})

		addCase(fetchByAddNewCard.rejected, (state, action) => {
			state.loading = false
			if (action.error.message?.includes('401')) {
				state.error = 'Упс что-то пошло не так!'
			}
		})
		// =======================
		addCase(fetchByDeleteCard.pending, (state) => {
			state.loading = true
			state.error = null
			state.reboot = true
		})

		addCase(fetchByDeleteCard.fulfilled, (state, action) => {
			state.loading = false
			state.reboot = false
		})

		addCase(fetchByDeleteCard.rejected, (state, action) => {
			state.loading = false
			if (action.error.message?.includes('404')) {
				state.error = 'Продукт не найден!'
			}
		})
	},
})

export default addProductSlice.reducer
