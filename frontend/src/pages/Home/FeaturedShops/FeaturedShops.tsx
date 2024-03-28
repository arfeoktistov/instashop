import React, { FC } from 'react'
import s from './FeaturedShops.module.scss'
import ShopCard from '../../../Component/ShopCard/ShopCard'
import { useAppSelector } from '../../../store/hooks/hooks'
import Loading from '../../../Component/Loading/Loading'

const FeaturedShops: FC = () => {
	const { loading, stores, error } = useAppSelector(state => state.stores)

	if (loading) {
		return <Loading />
	}

	return (
		<div className={s.FeaturedShops}>
			<h2 className={s.title}>Featured shops</h2>
			<div className={s.output}>
				{
					stores.length > 0 ?
						stores.map(el => <ShopCard key={el.id} {...el} />)
						:
						<>
							<h2 className={s.none}>Упс магазины не найдены!</h2>
							<span className='error'>{error}</span>
						</>
				}
			</div>
		</div>
	)
}

export default FeaturedShops
