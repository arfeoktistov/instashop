import React, { FC, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../../pages/Home/Home'
import SearchResults from '../../pages/SearchResults/SearchResults'
import Search from '../../pages/Search/Search'
import Profile from '../../pages/Profile/Profile'
import Discover from '../../pages/Discover/Discover'
import DetailView from '../../pages/DetailView/DetailView'
import SearchDetailView from '../../pages/DetailView/DetailViewComponents/SearchDetailView/SearchDetailView'
import PersonalProfile from '../../pages/PersonalProfile/PersonalProfile'
import AddingProduct from '../../pages/AddingProduct/AddingProduct'
import { useAppDispatch } from '../../store/hooks/hooks'
import { getAllStores } from '../../store/slice/storesSlice'

const Main: FC = () => {
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(getAllStores())
	}, [dispatch])

	return (
		<main className='container'>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/search_input' element={<SearchDetailView />} />
				<Route path='/detailview' element={<DetailView />} />
				<Route path='/discover' element={<Discover />} />
				<Route path='/profile/:id' element={<Profile />} />
				<Route path='/personal_profile' element={<PersonalProfile />} />
				<Route path='/search' element={<Search />} />
				<Route path='/adding_product' element={<AddingProduct />} />
				<Route path='/search-results' element={<SearchResults />} />
			</Routes>
		</main>
	)
}

export default Main
