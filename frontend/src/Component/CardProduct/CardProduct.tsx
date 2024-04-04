import React, { FC } from 'react'
import s from './CardProduct.module.scss'
import photo from '../../assets/PersonalProfile/Rectangle.png'
import pen from '../../assets/PersonalProfile/pen.png'
import deletes from '../../assets/PersonalProfile/delete.png'
import { Link } from 'react-router-dom'
import { ProfileCardModules } from '../../store/modules'
import { useAppDispatch } from '../../store/hooks/hooks'
import { fetchByDeleteCard } from '../../store/slice/addProductSlice'

const CardProduct: FC<ProfileCardModules> = ({ image, id, name }) => {
	const dispatch = useAppDispatch()
	const handleDeleteCard = () => {
		id &&
			dispatch(fetchByDeleteCard(id))
	}
	return (
		<Link to={`/detailview/${id}`} className={s.CardProduct}>
			<div className={s.photo_product}>
				<img src={image} alt='photos' />
			</div>
			<div className={s.name_pr}>
				<h2 title={name}>{name.length > 15 ? name.slice(0, 15) + '...' : name}</h2>
				<div className={s.buttons}>
					<Link to={`/adding_product?id_card=${id}`}>
						<img src={pen} alt='pen' />
					</Link>
					<img onClick={handleDeleteCard} src={deletes} alt='basket' />
				</div>
			</div>
		</Link>
	)
}

export default CardProduct
