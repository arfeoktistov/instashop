import React, { FC } from 'react'
import s from './PersonalProfile.module.scss'
import profile from '../../assets/PersonalProfile/Rectangle.png'
import ProductList from './ProductList/ProductList'
import { NavLink } from 'react-router-dom'

const PersonalProfile: FC = () => {
	return (
		<div className={s.PersonalProfile}>
			<div className={s.profile}>
				<img className={s.avatar} src={profile} alt='girls' />
				<div className={s.text_field}>
					<h2>Название профиля</h2>
					<div className={s.path_editing}>
						<NavLink to={'/adding_product'}>Редактировать профиль</NavLink>
						<NavLink to={'/adding_product'}>Добавить товар</NavLink>
					</div>
				</div>
			</div>
			<ProductList />
		</div>
	)
}

export default PersonalProfile
