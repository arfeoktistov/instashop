import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { FeedbackData, IInfoData } from '../modules'
import { storesApi } from '../../axios'

type StoreState = {
    loading: boolean
    error: null | string
    info: IInfoData | null
    feedback_success: boolean
}

const initialState: StoreState = {
    error: null,
    loading: false,
    info: null,
    feedback_success: false
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

export const fetchByNewFeedback = createAsyncThunk<void, FeedbackData, { rejectValue: string }>(
    'info/fetchByNewFeedback',
    async (data, { rejectWithValue }) => {
        const res = await storesApi.newFeedback(data)
        if (res.status !== 201) {
            return rejectWithValue('Error')
        }
    }
)

const storesSlice = createSlice({
    name: 'info',
    initialState,
    reducers: {
        toggleFeedback(state) {
            state.feedback_success = false
            state.error = null
        }
    },
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
        // ===============================================
        addCase(fetchByNewFeedback.pending, (state) => {
            state.loading = true
            state.error = null
        })
        addCase(fetchByNewFeedback.fulfilled, (state) => {
            state.feedback_success = true
            state.loading = false
        })
        addCase(fetchByNewFeedback.rejected, (state, action) => {
            state.loading = false
            state.error = "Что-то пошло не так, попробуйте позже!"
        })
    },
})

export const { toggleFeedback } = storesSlice.actions

export default storesSlice.reducer
