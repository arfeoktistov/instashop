import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slice/userSlice'
import storesSlice from './slice/storesSlice'

export const store = configureStore({
	// devTools:false
	reducer: {
		user: userSlice,
		stores: storesSlice,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
