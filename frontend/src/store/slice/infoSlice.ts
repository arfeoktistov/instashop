import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IInfoData } from '../modules'
import { storesApi } from '../../axios'

type StoreState = {
    loading: boolean
    error: null | string
    info: IInfoData | null
}

const initialState: StoreState = {
    error: null,
    loading: false,
    info: null
}

export const fetchByInfo = createAsyncThunk<IInfoData, void, { rejectValue: string }>(
    'info/fetchByInfo',
    async (_, { rejectWithValue }) => {
        const res = await storesApi.getInfo()

        if (res.status !== 200) {
            return rejectWithValue('Error')
        }
        return res.data[0] as IInfoData
    }
)

const storesSlice = createSlice({
    name: 'info',
    initialState,
    reducers: {},
    extraReducers: ({ addCase }) => {
        // ===============================================
        addCase(fetchByInfo.pending, (state) => {
            state.loading = true
            state.error = null
        })
        addCase(fetchByInfo.fulfilled, (state, action) => {
            state.info = action.payload
            state.loading = false
        })
        addCase(fetchByInfo.rejected, (state, action) => {
            state.loading = false
            console.log(action);
            state.error = null
        })
    },
})

export const { } = storesSlice.actions

export default storesSlice.reducer
