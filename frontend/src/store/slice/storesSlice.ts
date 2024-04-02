import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ICategory, IStores } from '../modules'
import { storesApi } from '../../axios'

type StoreState = {
    loading: boolean
    error: null | string
    stores: IStores[]
    all_categories: ICategory[]
}

const initialState: StoreState = {
    error: null,
    loading: false,
    stores: [],
    all_categories: []
}

export const getAllStores = createAsyncThunk<IStores[], void, { rejectValue: string }>(
    'stores/getAllStores',
    async (_, { rejectWithValue }) => {
        const res = await storesApi.getAllStores()

        if (res.status !== 200) {
            return rejectWithValue('Error')
        }
        return res.data as IStores[]
    }
)

export const getAllDataForCategories = createAsyncThunk<ICategory[], void, { rejectValue: string }>(
    'stores/getAllDataForCategories',
    async (_, { rejectWithValue }) => {
        const res = await storesApi.getCategory()
        // console.log(res);

        if (res.status !== 200) {
            return rejectWithValue('Error')
        }
        return res.data as ICategory[]
    }
)

export const getStoresByCategories = createAsyncThunk<IStores[], { cat_id: string, sub_id: string }, { rejectValue: string }>(
    'stores/getStoresByCategories',
    async (data, { rejectWithValue }) => {
        const { cat_id, sub_id } = data
        const res = await storesApi.getStoresByCategory(cat_id, sub_id)
        // console.log(res);

        if (res.status !== 200) {
            return rejectWithValue('Error')
        }
        return res.data as IStores[]
    }
)

const storesSlice = createSlice({
    name: 'stores',
    initialState,
    reducers: {},
    extraReducers: ({ addCase }) => {
        // ===============================================
        addCase(getAllStores.pending, (state, action) => {
            state.loading = true
            state.error = null
        })
        addCase(getAllStores.fulfilled, (state, action) => {
            state.stores = action.payload
            state.loading = false
        })
        addCase(getAllStores.rejected, (state, action) => {
            state.loading = false
            console.log(action);
            state.error = null
        })
        // ===============================================
        addCase(getAllDataForCategories.pending, (state, action) => {
            state.loading = true
            state.error = null
        })
        addCase(getAllDataForCategories.fulfilled, (state, action) => {
            state.all_categories = action.payload
            state.loading = false
        })
        addCase(getAllDataForCategories.rejected, (state, action) => {
            state.loading = false
            console.log(action);
            state.error = null
        })
        // ===============================================
        addCase(getStoresByCategories.pending, (state, action) => {
            state.loading = true
            state.error = null
        })
        addCase(getStoresByCategories.fulfilled, (state, action) => {
            state.stores = action.payload
            state.loading = false
        })
        addCase(getStoresByCategories.rejected, (state, action) => {
            state.loading = false
            console.log(action);
            state.error = null
        })
        // ===============================================
    },
})

export const { } = storesSlice.actions

export default storesSlice.reducer
