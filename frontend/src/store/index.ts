import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slice/userSlice'
<<<<<<< HEAD
import detailProfileSlice from './slice/detailProfileSlice'
import addProductSlice from './slice/addProductSlice'
import storesSlice from './slice/storesSlice'
import infoSlice from './slice/infoSlice'
=======
import addProductSlice from './slice/addProductSlice'
>>>>>>> 9c1faaff (personal profile)

export const store = configureStore({
	// devTools:false
	reducer: {
		user: userSlice,
<<<<<<< HEAD
		profile: detailProfileSlice,
		addProductSlice: addProductSlice,
		stores: storesSlice,
		info: infoSlice,
=======
		addProductSlice: addProductSlice,
>>>>>>> 9c1faaff (personal profile)
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
