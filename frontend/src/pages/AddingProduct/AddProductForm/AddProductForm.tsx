import React, { FC, FormEventHandler, useEffect, useState } from 'react'
import s from './AddProductForm.module.scss'
import { useAppDispatch, useAppSelector } from '../../../store/hooks/hooks'
import { fetchByAllCategory, } from '../../../store/slice/addProductSlice'
import { IAddProductsCard, ISubCategory } from '../../../store/modules'
interface AddProductFormProps {
	handleAddProduct: FormEventHandler<HTMLFormElement>
	setProductCard: (e: IAddProductsCard) => void
	productCard: IAddProductsCard
	errorText: string
	query: string | null
}
const AddProductForm: FC<AddProductFormProps> = ({ handleAddProduct, setProductCard, productCard, errorText, query }) => {
	const dispatch = useAppDispatch()
	useEffect(() => {
		dispatch(fetchByAllCategory())
	}, [dispatch])
	const [subCategories, setSubCategories] = useState<ISubCategory[]>([])
	const getProductCard = (key: string, value: string) => {
		setProductCard({ ...productCard, [key]: value.trimStart() })
	}
	const { category, profileCard } = useAppSelector(state => state.addProductSlice)

	const handleSubCategories = (value: string) => {
		category.filter((el) => el.name === value && setSubCategories(el.sub_categories))
	}
	// console.log(subCategories);

	return (
		<form onSubmit={handleAddProduct} className={s.add_form}>
			<div className={s.field_to_fill}>
				<div className={s.left_part}>
					<div className={errorText.includes('Введите название!') ? `${s.error_text} ${s.left_part_field}` : s.left_part_field}>
						<h2>Введите название</h2>
						<input value={productCard.name} onChange={e => getProductCard('name', e.target.value)} className={s.text_field} type='text' placeholder='Название' />
					</div>
					<div className={errorText.includes('Введите описание!') ? `${s.error_text} ${s.left_part_field}` : s.left_part_field}>
						<h2>Введите Описание</h2>
						<textarea
							onChange={e => getProductCard('description', e.target.value)}
							value={productCard.description}
							rows={4} cols={50} placeholder='Описание' className={s.description}></textarea>
					</div>
					<div className={errorText.includes('Введите стоимость!') ? `${s.error_text} ${s.left_part_field}` : s.left_part_field}>
						<h2>Введите Стоимость</h2>
						<input value={productCard.price} onChange={e => getProductCard('price', e.target.value)} className={s.text_field} type='text' placeholder='Стоимость' />
					</div>
				</div>
				<div className={s.right_part}>
					<div className={s.right_part_field}>
						<h2>Выберите Категорию</h2>
						<select onChange={(e) => handleSubCategories(e.target.value)} className={s.category}>
							<option value=''>Выберите категорию</option>
							{category.length > 0 && category.map(el => <option key={el.id} value={el.name}>{el.name}</option>)}
						</select>
					</div>
					{subCategories.length > 0 &&
						<div className={errorText.includes('Введите подкатегорию!') ? `${s.error_text} ${s.right_part_field}` : s.right_part_field}>
							<h2>Выберите Категорию</h2>
							<select value={productCard.sub_category.name} onChange={e => setProductCard({ ...productCard, sub_category: { ...productCard.sub_category, name: e.target.value } })} className={s.category}>
								<option value=''>Выберите подкатегорию</option>
								{category.length > 0 && subCategories.map(el => <option key={el.id} value={el.name}>{el.name}</option>)}
							</select>
						</div>
					}
				</div>
			</div>
			<div className={s.button_form}>
				<h2>{errorText}</h2>
				<button>Добавить</button>
			</div>
		</form>
	)
}

export default AddProductForm
