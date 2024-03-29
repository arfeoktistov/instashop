import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slice/userSlice'
import addProductSlice from './slice/addProductSlice'
import storesSlice from './slice/storesSlice'

export const store = configureStore({
	// devTools:false
	reducer: {
		user: userSlice,
		addProductSlice: addProductSlice,
		stores: storesSlice,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
