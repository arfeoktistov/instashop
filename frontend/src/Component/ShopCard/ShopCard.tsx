import React, { FC } from 'react'
import s from './ShopCard.module.scss'
import Image from '../../assets/Home/Image.png'

const ShopCard: FC = () => {
	return (
		<div className={s.card}>
			<div className={s.image_shop}>
				<img
					src='https://i.pinimg.com/736x/ec/11/63/ec116392ec10ca3e844112700aa6c563.jpg'
					alt='women'
				/>
				<div className={s.up_field}>
					<div className={s.top_up_field}>
						<h2>Exclusive @ShopName</h2>
						<h2>Handpicked items for you</h2>
						<p className={s.shop_link}>Перейти...</p>
					</div>
				</div>
			</div>
			<div className={s.name_block}>
				<h2>Название магазина</h2>
			</div>
		</div>
	)
}

export default ShopCard
