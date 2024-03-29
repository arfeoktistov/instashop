import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slice/userSlice'
import detailProfileSlice from './slice/detailProfileSlice'

export const store = configureStore({
	// devTools:false
	reducer: {
		user: userSlice,
		profile: detailProfileSlice,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
