import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slice/userSlice'
import addProductSlice from './slice/addProductSlice'

export const store = configureStore({
	// devTools:false
	reducer: {
		user: userSlice,
		addProductSlice: addProductSlice,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
