import React, { FC } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../../pages/Home/Home'
import SearchResults from '../../pages/SearchResults/SearchResults'
import Search from '../../pages/Search/Search'
import Profile from '../../pages/Profile/Profile'
import Discover from '../../pages/Discover/Discover'

const Main: FC = () => {
	return (
		<main className='main'>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/discover' element={<Discover />} />
				<Route path='/profile' element={<Profile />} />
				<Route path='/search' element={<Search />} />
				<Route path='/search-results' element={<SearchResults />} />
			</Routes>
		</main>
	)
}

export default Main
