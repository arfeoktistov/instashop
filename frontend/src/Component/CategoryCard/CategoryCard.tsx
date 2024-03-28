import React, { FC } from 'react'
import s from './CategoryCard.module.scss'
import Image5 from '../../assets/Home/Image5.png'
import dabi from '../../assets/Home/dabi.png'
import Imagepos from '../../assets/Home/Imagepos.png'

const CategoryCard: FC = () => {
	return (
		<div
			style={{
				backgroundImage: `url(${Image5})`,
				backgroundRepeat: 'no-repeat',
				backgroundSize: '100%',
			}}
			className={s.card}
		>
			<div className={s.in_card}>
				<h3>Featured</h3>
				<p>1.0 ETH</p>
				<img className={s.img_dabi} src={dabi} alt='Dabi' />
				<img className={s.img_pos} src={Imagepos} alt='img' />
			</div>
		</div>
	)
}

export default CategoryCard
