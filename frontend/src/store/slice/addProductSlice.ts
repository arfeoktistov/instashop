import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { authApi } from '../../axios'
import { Icategory } from '../modules'

type UserState = {
	loading: boolean
	error: null | string
	category: Icategory[]
}

const initialState: UserState = {
	error: null,
	loading: false,
	category: [],
}
export const fetchByAllCategory = createAsyncThunk<
	Icategory[],
	void,
	{ rejectValue: string }
>('news/fetchByAllNews', async (_, { rejectWithValue }) => {
	const res = await authApi.getCategory()
	console.log(res)
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
	},
})

export default addProductSlice.reducer
