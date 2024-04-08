import React, { FC } from 'react'
import s from './CardProduct.module.scss'
import pen from '../../assets/PersonalProfile/pen.png'
import deletes from '../../assets/PersonalProfile/delete.png'
import { Link, NavLink } from 'react-router-dom'
import { ProfileCardModules } from '../../store/modules'
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks'
import { fetchByDeleteCard } from '../../store/slice/addProductSlice'

const CardProduct: FC<ProfileCardModules> = ({ image, id, name }) => {
	const dispatch = useAppDispatch()
	const { token } = useAppSelector(state => state.user)
	const handleDeleteCard = () => {
		id && token &&
			dispatch(fetchByDeleteCard({ id, token }))
	}
	// console.log(id);

	return (
		<div className={s.CardProduct}>
			<Link to={`/detailview/${id}`} className={s.photo_product}>
				<img src={image} alt='photos' />
			</Link>
			<div className={s.name_pr}>
				<NavLink className={s.name} to={`/detailview/${id}`} title={name}>{name.length > 10 ? name.slice(0, 10) + '...' : name}</NavLink>
				<div className={s.buttons}>
					<Link to={`/adding_product?id_card=${id}`}>
						<img src={pen} alt='pen' />
					</Link>
					<img onClick={handleDeleteCard} src={deletes} alt='basket' />
				</div>
			</div>
		</div>
	)
}

export default CardProduct
