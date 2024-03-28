import React, { FC } from 'react'
import SearchInput from './SearchInput/SearchInput'
import FeaturedShops from './FeaturedShops/FeaturedShops'
import TrendingCategories from './TrendingCategories/TrendingCategories'

const Home: FC = () => {
	return (
		<div>
			<SearchInput />
			<FeaturedShops />
			<TrendingCategories />
		</div>
	)
}

export default Home
