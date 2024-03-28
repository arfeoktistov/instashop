import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IStores } from '../modules'
import { storesApi } from '../../axios'

type StoreState = {
    loading: boolean
    error: null | string
    stores: IStores[]
}

const initialState: StoreState = {
    error: null,
    loading: false,
    stores: []
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

    },
})

export const { } = storesSlice.actions

export default storesSlice.reducer
