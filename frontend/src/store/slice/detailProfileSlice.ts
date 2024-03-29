import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { authApi } from "../../axios"
import { DetailProfile } from "../modules"



type NewsState = {
    loading: boolean
    error: null | string | undefined
    profile: DetailProfile | null
}

const initialState: NewsState = {
    error: null,
    loading: false,
    profile: null,

}


export const fetchByDetailProfile = createAsyncThunk<DetailProfile, number, { rejectValue: string }>(
    'profile/fetchByDetailProfile',
    async (id, { rejectWithValue }) => {
        const res = await authApi.getProfileDetail(id)
        console.log(res);
        if (res.status !== 200) {
            return rejectWithValue('Server Error')
        }
        return res.data as DetailProfile
    }
)


const detailProfileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
    extraReducers: ({ addCase }) => {
        addCase(fetchByDetailProfile.pending, (state) => {
            state.loading = true
            state.error = null
        })

        addCase(fetchByDetailProfile.fulfilled, (state, action) => {
            state.profile = action.payload
            state.loading = false
        })

        addCase(fetchByDetailProfile.rejected, (state, action) => {
            state.loading = false
            if (action.payload?.includes('404')) {
                state.error = 'No Broouuuu,No News!'
            } else {
                state.error = action.payload
            }
        })

    }

})


export default detailProfileSlice.reducer