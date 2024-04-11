import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { storesApi } from '../../axios'
import { GetToken, IIdTokenShopUser, TokenNodules, UserLogin } from '../modules'
import { removeLSToken, setLSToken } from '../../LS'

type UserState = {
	loading: boolean
	error: null | string
	token: null | string
	redirect: boolean
	reboot: boolean
	user: null | TokenNodules
}

const initialState: UserState = {
	error: null,
	loading: false,
	token: null,
	reboot: false,
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

// получение инфо по user

export const fetchByToken = createAsyncThunk<TokenNodules, string, { rejectValue: string }>(
	'user/fetchByToken', async (token, { rejectWithValue }) => {
		const res = await storesApi.getTokenUser(token)
		// console.log(res)
		if (res.status !== 200) {
			return rejectWithValue('Server error')
		}

		return res.data
	})

// Изменение данных по seller_user
export const fetchByChangeUserData = createAsyncThunk<void, IIdTokenShopUser, { rejectValue: string }>(
	'user/fetchByChangeUserData', async (forChangeUserData, { rejectWithValue }) => {
		const res = await storesApi.changeTokenUser(forChangeUserData)
		// console.log(res)
		if (res.status !== 200) {
			return rejectWithValue('Server error')
		}
	})

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		toggleRedirect(state, action: PayloadAction<boolean>) {
			state.redirect = action.payload
			state.reboot = action.payload
		},
		setToken(state, action: PayloadAction<string | null>) {
			state.token = action.payload
		},
		changeError(state, action: PayloadAction<string | null>) {
			state.error = action.payload
		},
		logOutUser(state) {
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
		addCase(fetchByToken.pending, (state) => {
			state.loading = true
			state.error = null
		})

		addCase(fetchByToken.fulfilled, (state, action) => {
			state.user = action.payload
			state.loading = false
		})

		addCase(fetchByToken.rejected, (state, action) => {
			state.loading = false
			if (action.error.message?.includes('401')) {
				state.error = 'Токен не правильный!'
			}
		})

		addCase(fetchByChangeUserData.pending, (state) => {
			state.loading = true
			state.error = null
		})

		addCase(fetchByChangeUserData.fulfilled, (state) => {
			state.reboot = true
			state.loading = false
		})

		addCase(fetchByChangeUserData.rejected, (state, action) => {
			state.loading = false
			if (action.error.message?.includes('400')) {
				state.error = 'Упс что-то пошло не так!'
			} else if (action.error.message?.includes('401')) {
				state.error = 'Не авторизован!'
			}
		})
	},
})
export const { toggleRedirect, setToken, logOutUser, changeError } = userSlice.actions
export default userSlice.reducer
