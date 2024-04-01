import React, { FC } from 'react'
import s from './ShopCard.module.scss'
import Image from '../../assets/Home/Image5.png'
import { IStores } from '../../store/modules'
import { Link } from 'react-router-dom'


const ShopCard: FC<IStores> = ({ id, main_image, mini_description, shop_name }) => {
	console.log(id);

	return (
		<div className={s.card}>
			<div className={s.image_shop}>
				<img
					src={`${Image}`}
					alt={shop_name}
				/>
				<div className={s.up_field}>
					<div className={s.top_up_field}>
						<h2>{mini_description}</h2>
						{/* <h2>Handpicked items for you</h2> */}
						<Link to={`/profile/${id}`} className={s.shop_link}>Перейти...</Link>
					</div>
				</div>
			</div>
			<div className={s.name_block}>
				<h2>{shop_name}</h2>
			</div>
		</div>
	)
}

export default ShopCard
