import React, { FC } from 'react'
import s from './TrendingCategories.module.scss'
import CategoryCard from '../../../Component/CategoryCard/CategoryCard'

const TrendingCategories: FC = () => {
	return (
		<div className={s.TrendingCategories}>
			<h2 className={s.title}>Trending categories</h2>
			<div className={s.output}>
				<CategoryCard />
				<CategoryCard />
				<CategoryCard />
				<CategoryCard />
			</div>
		</div>
	)
}

export default TrendingCategories
