import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

type UserState = {
	loading: boolean
	error: null | string
	token: null | string
	redirect: boolean
	user: null
}

const initialState: UserState = {
	error: null,
	loading: false,
	token: null,
	redirect: false,
	user: null,
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: ({ addCase }) => {},
})

export const {} = userSlice.actions

export default userSlice.reducer
