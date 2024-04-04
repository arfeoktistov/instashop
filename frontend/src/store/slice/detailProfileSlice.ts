import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { storesApi } from "../../axios"
import { DetailProfile, ICategory, IProductsCat, ProfileCardModules } from "../modules"

type NewsState = {
    loading: boolean
    error: null | string | undefined
    profile: DetailProfile | null
    profileCard: ProfileCardModules[]
    detailview: ProfileCardModules | null
    profile_categories: ICategory[]
}

const initialState: NewsState = {
    error: null,
    loading: false,
    profile: null,
    profileCard: [],
    detailview: null,
    profile_categories: []
}


export const fetchByDetailProfile = createAsyncThunk<DetailProfile, number, { rejectValue: string }>(
    'profile/fetchByDetailProfile',
    async (id, { rejectWithValue }) => {
        const res = await storesApi.getProfileDetail(id)
        // console.log(res);
        if (res.status !== 200) {
            return rejectWithValue('Server Error')
        }
        return res.data as DetailProfile
    }
)
export const fetchByProfileCard = createAsyncThunk<ProfileCardModules[], number, { rejectValue: string }>(
    'profile/fetchByProfileCard',
    async (id, { rejectWithValue }) => {
        const res = await storesApi.getProfileCard(id)
        // console.log(res);
        if (res.status !== 200) {
            return rejectWithValue('Server Error')
        }
        return res.data
    }
)

export const fetchByDetailView = createAsyncThunk<ProfileCardModules, number, { rejectValue: string }>(
    'profile/fetchByDetailView',
    async (id, { rejectWithValue }) => {
        const res = await storesApi.getDetailView(id)
        // console.log(res);
        if (res.status !== 200) {
            return rejectWithValue('Server Error')
        }
        return res.data as ProfileCardModules
    }
)

export const fetchByProfileCategories = createAsyncThunk<ICategory[], number, { rejectValue: string }>(
    'profile/fetchByProfileCategories',
    async (id, { rejectWithValue }) => {
        const res = await storesApi.getStoreCategories(id)
        // console.log(res);
        if (res.status !== 200) {
            return rejectWithValue('Server Error')
        }
        return res.data as ICategory[]
    }
)

export const fetchByCardsByCategories = createAsyncThunk<ProfileCardModules[], IProductsCat, { rejectValue: string }>(
    'profile/fetchByCardsByCategories',
    async (data, { rejectWithValue }) => {
        const res = await storesApi.getProductsByCategory(data)
        // console.log(res);
        if (res.status !== 200) {
            return rejectWithValue('Server Error')
        }
        return res.data as ProfileCardModules[]
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
        // =============================================================
        addCase(fetchByProfileCard.pending, (state) => {
            state.loading = true
            state.error = null
        })

        addCase(fetchByProfileCard.fulfilled, (state, action) => {
            state.profileCard = action.payload
            state.loading = false
        })

        addCase(fetchByProfileCard.rejected, (state, action) => {
            state.loading = false
            if (action.payload?.includes('404')) {
                state.error = 'No Broouuuu,No News!'
            } else {
                state.error = action.payload
            }
        })
        // =============================================================
        addCase(fetchByDetailView.pending, (state) => {
            state.loading = true
            state.error = null
        })

        addCase(fetchByDetailView.fulfilled, (state, action) => {
            state.detailview = action.payload
            state.loading = false
        })

        addCase(fetchByDetailView.rejected, (state, action) => {
            state.loading = false
            if (action.payload?.includes('404')) {
                state.error = 'No Broouuuu,No News!'
            } else {
                state.error = action.payload
            }
        })
        // =============================================================
        addCase(fetchByProfileCategories.pending, (state) => {
            state.loading = true
            state.error = null
        })

        addCase(fetchByProfileCategories.fulfilled, (state, action) => {
            state.profile_categories = action.payload
            state.loading = false
        })

        addCase(fetchByProfileCategories.rejected, (state, action) => {
            state.loading = false
            if (action.payload?.includes('404')) {
                state.error = 'No Broouuuu,No News!'
            } else {
                state.error = action.payload
            }
        })
        // =============================================================
        addCase(fetchByCardsByCategories.pending, (state) => {
            state.loading = true
            state.error = null
        })

        addCase(fetchByCardsByCategories.fulfilled, (state, action) => {
            state.profileCard = action.payload
            state.loading = false
        })

        addCase(fetchByCardsByCategories.rejected, (state, action) => {
            state.loading = false
            if (action.payload?.includes('404')) {
                state.error = 'No Broouuuu,No News!'
            } else {
                state.error = action.payload
            }
        })
        // =============================================================
    }

})


export default detailProfileSlice.reducer