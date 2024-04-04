import React, { FC, useEffect } from 'react'
import s from './ProductList.module.scss'
import CardProduct from '../../../Component/CardProduct/CardProduct'
import { useAppDispatch, useAppSelector } from '../../../store/hooks/hooks'
import { fetchByGetCard } from '../../../store/slice/addProductSlice'

const ProductList: FC = () => {
	const dispatch = useAppDispatch()
	const { profileCard, reboot } = useAppSelector(state => state.addProductSlice)
	useEffect(() => {
		dispatch(fetchByGetCard(3))
	}, [dispatch, reboot])
	console.log(profileCard);

	return (
		<div className={s.ProductList}>
			<h2>Список товаров </h2>
			<div className={s.output}>
				{profileCard.length > 0 ? profileCard.map(el => <CardProduct key={el.id} {...el} />) : <h2>Товары отсутствуют</h2>}
			</div>
		</div>
	)
}

export default ProductList
