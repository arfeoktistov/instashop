import React, { FC } from 'react'
import s from './CardProduct.module.scss'
import photo from '../../assets/PersonalProfile/Rectangle.png'
import pen from '../../assets/PersonalProfile/pen.png'
import deletes from '../../assets/PersonalProfile/delete.png'
import { Link } from 'react-router-dom'

const CardProduct: FC = () => {
	return (
		<div className={s.CardProduct}>
			<div className={s.photo_product}>
				<img src={photo} alt='photos' />
			</div>
			<div className={s.name_pr}>
				<h2>Название</h2>
				<div className={s.buttons}>
					<Link to={'/adding_product'}>
						<img src={pen} alt='pen' />
					</Link>
					<img src={deletes} alt='basket' />
				</div>
			</div>
		</div>
	)
}

export default CardProduct
