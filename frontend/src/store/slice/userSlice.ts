import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { storesApi } from '../../axios'
import { GetToken, UserLogin } from '../modules'
import { removeLSToken, setLSToken } from '../../LS'

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
// Авторизация
export const fetchByLogin = createAsyncThunk<GetToken, UserLogin, { rejectValue: string }>(
	'user/fetchByLogin', async (getUser, { rejectWithValue }) => {
		const res = await storesApi.addNewUser(getUser)
		// console.log(res)
		if (res.status !== 200) {
			return rejectWithValue('Server error')
		}
		return res.data as GetToken
	})

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		toggleRedirect(state, action: PayloadAction<boolean>) {
			state.redirect = action.payload
		},
		setToken(state, action: PayloadAction<string | null>) {
			state.token = action.payload
		},
		logOut(state) {
			state.token = null
			state.user = null
			removeLSToken()
		},
	},
	extraReducers: ({ addCase }) => {
		// ===============
		addCase(fetchByLogin.pending, state => {
			state.loading = true
			state.error = null
		})
		addCase(fetchByLogin.fulfilled, (state, action) => {
			state.loading = false
			if (action.payload.access) {
				state.token = action.payload.access
				state.redirect = true
				setLSToken(action.payload.access)
			}
		})
		addCase(fetchByLogin.rejected, (state, action) => {
			state.loading = false
			if (action.error.message?.includes('401')) {
				state.error = 'Логин или пароль неправильно введён!'
			} else if (action.error.message?.includes('404')) {
				state.error = 'Упс что-то пошло не так попробуйте снова!'
			}
		})
	},
})
export const { toggleRedirect, setToken, logOut, } = userSlice.actions
export default userSlice.reducer
