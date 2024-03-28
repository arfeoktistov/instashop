import React, { FC } from 'react'
import s from './ProductList.module.scss'
import CardProduct from '../../../Component/CardProduct/CardProduct'

const ProductList: FC = () => {
	return (
		<div className={s.ProductList}>
			<h2>Список товаров </h2>
			<div className={s.output}>
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
			</div>
		</div>
	)
}

export default ProductList
