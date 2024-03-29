import React, { FC, FormEventHandler, useState } from 'react'
import s from './AddingProduct.module.scss'
import AddPhoto from './AddPhoto/AddPhoto'
import AddProductForm from './AddProductForm/AddProductForm'

const AddingProduct: FC = () => {
	const [fileLeft, setFileLeft] = useState<File | string>('')
	const [fileCenter, setFileCenter] = useState<File | string>('')
	const [fileRight, setFileRight] = useState<File | string>('')
	const handleAddProduct: FormEventHandler<HTMLFormElement> = e => {
		e.preventDefault()
	}
	return (
		<div className={s.AddingProduct}>
			<h2>Заполните данные для добавления товара</h2>
			<AddPhoto
				setFileLeft={setFileLeft}
				setFileCenter={setFileCenter}
				setFileRight={setFileRight}
			/>
			<AddProductForm handleAddProduct={handleAddProduct} />
		</div>
	)
}

export default AddingProduct
