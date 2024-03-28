import React, { FC } from 'react'
import s from './FeaturedShops.module.scss'
import ShopCard from '../../../Component/ShopCard/ShopCard'

const FeaturedShops: FC = () => {
	return (
		<div className={s.FeaturedShops}>
			<h2 className={s.title}>Featured shops</h2>
			<div className={s.output}>
				<ShopCard />
				<ShopCard />
				<ShopCard />
				<ShopCard />
			</div>
		</div>
	)
}

export default FeaturedShops
