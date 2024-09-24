<<<<<<< HEAD
import React, { FC, useEffect } from 'react'
import s from './ProductList.module.scss'
import CardProduct from '../../../Component/CardProduct/CardProduct'
import { useAppDispatch, useAppSelector } from '../../../store/hooks/hooks'
import { fetchByGetCard } from '../../../store/slice/addProductSlice'

const ProductList: FC = () => {
	const dispatch = useAppDispatch()
	const { user } = useAppSelector(state => state.user)
	const { profileCard, reboot } = useAppSelector(state => state.addProductSlice)

	useEffect(() => {
		user && user.seller_user?.id &&
			dispatch(fetchByGetCard(user.seller_user?.id))
	}, [dispatch, user, reboot])

=======
import React, { FC } from 'react'
import s from './ProductList.module.scss'
import CardProduct from '../../../Component/CardProduct/CardProduct'

const ProductList: FC = () => {
>>>>>>> 9c1faaff (personal profile)
	return (
		<div className={s.ProductList}>
			<h2>Список товаров </h2>
			<div className={s.output}>
<<<<<<< HEAD
				{profileCard.length > 0 ? profileCard.map(el => <CardProduct first_name={user?.first_name} key={el.id} {...el} />) : <h2>Товары отсутствуют</h2>}
=======
				<CardProduct />
				<CardProduct />
				<CardProduct />
				<CardProduct />
				<CardProduct />
				<CardProduct />
				<CardProduct />
				<CardProduct />
				<CardProduct />
				<CardProduct />
>>>>>>> 9c1faaff (personal profile)
			</div>
		</div>
	)
}

export default ProductList
