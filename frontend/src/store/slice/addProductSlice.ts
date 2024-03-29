import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { storesApi } from '../../axios'
import { Icategory } from '../modules'

type UserState = {
	loading: boolean
	error: null | string
	category: Icategory[]
	subCategory: Icategory[]
}

const initialState: UserState = {
	error: null,
	loading: false,
	category: [],
	subCategory: [],
}
export const fetchByAllCategory = createAsyncThunk<Icategory[], void, { rejectValue: string }>(
	'news/fetchByAllCategory', async (_, { rejectWithValue }) => {
		const res = await storesApi.getCategory()
		// console.log(res)
		if (res.status !== 200) {
			return rejectWithValue('Server Error')
		}
		return res.data
	})

export const fetchByAllSubCategory = createAsyncThunk<Icategory[], void, { rejectValue: string }>(
	'news/fetchByAllSubCategory', async (_, { rejectWithValue }) => {
		const res = await storesApi.getSubCategory()
		// console.log(res)
		if (res.status !== 200) {
			return rejectWithValue('Server Error')
		}
		return res.data
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
			state.loading = false
			state.category = action.payload
		})
		addCase(fetchByAllCategory.rejected, (state, action) => {
			state.loading = false
			if (action.error.message?.includes('400')) {
				state.error = 'Упс что то пошло не так!'
			}
		})

		addCase(fetchByAllSubCategory.pending, state => {
			state.loading = true
			state.error = null
		})
		addCase(fetchByAllSubCategory.fulfilled, (state, action) => {
			state.loading = false
			state.subCategory = action.payload
		})
		addCase(fetchByAllSubCategory.rejected, (state, action) => {
			state.loading = false
			if (action.error.message?.includes('400')) {
				state.error = 'Упс что то пошло не так!'
			}
		})
	},
})

export default addProductSlice.reducer
