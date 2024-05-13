import React, { FC, useEffect } from 'react'
import SearchInput from './SearchInput/SearchInput'
import FeaturedShops from './FeaturedShops/FeaturedShops'
import TrendingCategories from './TrendingCategories/TrendingCategories'
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks'
import { getAllDataForCategories } from '../../store/slice/storesSlice'
import { Helmet } from 'react-helmet-async'

const Home: FC = () => {
	const dispatch = useAppDispatch()
	const { all_categories } = useAppSelector(state => state.stores)

	useEffect(() => {
		!all_categories.length && dispatch(getAllDataForCategories())
	}, [dispatch])
	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])
	return (
		<div>
			<Helmet>
				<meta property="og:title" content={`Магазины | AGREGAGATOR`} />
				<meta name="twitter:title" content={`Магазины | AGREGAGATOR`} />
				<link rel="canonical" href={`https://gagaga.kg/`} />
				<title>Магазины | AGREGAGATOR</title>
			</Helmet>
			<SearchInput />
			<FeaturedShops />
			{/* <TrendingCategories /> */}
		</div>
	)
}

export default Home
