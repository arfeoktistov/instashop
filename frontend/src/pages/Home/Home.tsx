import React, { FC, useEffect } from 'react'
import SearchInput from './SearchInput/SearchInput'
import FeaturedShops from './FeaturedShops/FeaturedShops'
import TrendingCategories from './TrendingCategories/TrendingCategories'
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks'
import { getAllDataForCategories } from '../../store/slice/storesSlice'

const Home: FC = () => {
	const dispatch = useAppDispatch()
	const { all_categories } = useAppSelector(state => state.stores)

	useEffect(() => {
		!all_categories.length && dispatch(getAllDataForCategories())
	}, [dispatch])
	return (
		<div>
			<SearchInput />
			<FeaturedShops />
			{/* <TrendingCategories /> */}
		</div>
	)
}

export default Home
