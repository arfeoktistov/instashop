import React, { FC, useState } from 'react'
import s from './CardProduct.module.scss'
import pen from '../../assets/PersonalProfile/pen.png'
import deletes from '../../assets/PersonalProfile/delete.png'
import { Link, NavLink } from 'react-router-dom'
import { ProfileCardModules } from '../../store/modules'
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks'
import { fetchByDeleteCard } from '../../store/slice/addProductSlice'
import DeleteProduct from '../../pages/PersonalProfile/ProductList/DeleteProduct/DeleteProduct'
import { pathLink } from '../../reused'

interface CardProductProps {
	first_name?: string
}

const CardProduct: FC<ProfileCardModules & CardProductProps> = ({ image, id, name, first_name }) => {
	const dispatch = useAppDispatch()
	const [logOut, setLogOut] = useState(false)
	const { token, user } = useAppSelector(state => state.user)
	const handleDeleteCard = () => {
		id && token &&
			dispatch(fetchByDeleteCard({ id, token }))
	}
	return (
		<div className={s.CardProduct}>
			<Link to={`/detailview/${id}/${first_name}`} className={s.photo_product}>
				<img src={image.startsWith('http') ? `https${image.slice(4)}` : pathLink + image} alt='photos' />
			</Link>
			<div className={s.name_pr}>
				<NavLink className={s.name} to={`/detailview/${id}`} title={name}>{name.length > 10 ? name.slice(0, 10) + '...' : name}</NavLink>
				<div className={s.buttons}>
					<Link to={`/adding_product?id_card=${id}`}>
						<img src={pen} alt='pen' />
					</Link>
					<img onClick={() => setLogOut(true)} src={deletes} alt='basket' />
				</div>
			</div>
			{logOut && <DeleteProduct logOut={logOut} setLogOut={setLogOut} handleDeleteCard={handleDeleteCard} />}
		</div>
	)
}

export default CardProduct
