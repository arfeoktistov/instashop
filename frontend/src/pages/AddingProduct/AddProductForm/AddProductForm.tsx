<<<<<<< HEAD
import React, { FC, FormEventHandler, useEffect, useState } from 'react'
import s from './AddProductForm.module.scss'
import { useAppDispatch, useAppSelector } from '../../../store/hooks/hooks'
import { fetchByAllCategory, } from '../../../store/slice/addProductSlice'
import { IAddProductsCard, ISubCategory } from '../../../store/modules'
interface AddProductFormProps {
	handleAddProduct: FormEventHandler<HTMLFormElement>
	setProductCard: (e: IAddProductsCard) => void
	setCategories: (e: string) => void
	productCard: IAddProductsCard
	categories: string
	errorText: string
	query: string | null
}
const AddProductForm: FC<AddProductFormProps> = ({ handleAddProduct, setProductCard, productCard, errorText, query, setCategories, categories }) => {
	const dispatch = useAppDispatch()
	const { category } = useAppSelector(state => state.addProductSlice)
	const [subCategories, setSubCategories] = useState<ISubCategory[]>([])

	const getProductCard = (key: string, value: string) => {
		setProductCard({ ...productCard, [key]: value.trimStart() })
	}

	useEffect(() => {
		dispatch(fetchByAllCategory())
	}, [dispatch])

	useEffect(() => {
		if (categories) {
			category.filter((el) => el.name === categories && setSubCategories([...el.sub_categories]))

		} else if (categories === '') {
			setSubCategories([])
		}
	}, [categories])
	const sorted = subCategories.sort((a, b) => {
		if (a.name.toLowerCase() < b.name.toLowerCase()) {
			return -1;
		}
		if (a.name.toLowerCase() > b.name.toLowerCase()) {
			return 1;
		}
		return 0;
	});
	// console.log(subCategories);
=======
import React, { FC, FormEventHandler, useEffect } from 'react'
import s from './AddProductForm.module.scss'
import { useAppDispatch, useAppSelector } from '../../../store/hooks/hooks'
import { fetchByAllCategory } from '../../../store/slice/addProductSlice'
interface AddProductFormProps {
	handleAddProduct: FormEventHandler<HTMLFormElement>
}
const AddProductForm: FC<AddProductFormProps> = ({ handleAddProduct }) => {
	const dispatch = useAppDispatch()
	useEffect(() => {
		dispatch(fetchByAllCategory())
	}, [dispatch])
	const { category } = useAppSelector(state => state.addProductSlice)
>>>>>>> 9c1faaff (personal profile)
	return (
		<form onSubmit={handleAddProduct} className={s.add_form}>
			<div className={s.field_to_fill}>
				<div className={s.left_part}>
<<<<<<< HEAD
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
					<div className={(errorText.includes('Введите стоимость!') || errorText.includes('Стоимость должен быть менее 9999999999сом!')) ? `${s.error_text} ${s.left_part_field}` : s.left_part_field}>
						<h2>Введите Стоимость</h2>
						<input value={productCard.price} onChange={e => getProductCard('price', e.target.value)} className={s.text_field} type='number' placeholder='Стоимость' />
=======
					<div className={s.left_part_field}>
						<h2>Введите название</h2>
						<input
							className={s.text_field}
							type='text'
							placeholder='Название'
						/>
					</div>
					<div className={s.left_part_field}>
						<h2>Введите Описание</h2>
						<textarea
							// onChange={e => handleChange('description', e.target.value)}
							// value={orderData.description}
							rows={4}
							cols={50}
							placeholder='Описание'
							className={s.description}
						></textarea>
					</div>
					<div className={s.left_part_field}>
						<h2>Введите Стоимость</h2>
						<input
							className={s.text_field}
							type='text'
							placeholder='Стоимость'
						/>
>>>>>>> 9c1faaff (personal profile)
					</div>
				</div>
				<div className={s.right_part}>
					<div className={s.right_part_field}>
						<h2>Выберите Категорию</h2>
<<<<<<< HEAD
						<select value={categories} onChange={(e) => setCategories(e.target.value)} className={s.category}>
							<option disabled value=''>Выберите категорию</option>
							{category.length > 0 && category.map(el => <option key={el.id} value={el.name}>{el.name}</option>)}
						</select>
					</div>
					{subCategories.length > 0 &&
						<div className={errorText.includes('Введите подкатегорию!') ? `${s.error_text} ${s.right_part_field}` : s.right_part_field}>
							<h2>Выберите Категорию</h2>
							<select value={productCard.sub_category ? productCard.sub_category : ''} onChange={e => getProductCard('sub_category', e.target.value)} className={s.category}>
								<option disabled value=''>Выберите подкатегорию</option>
								{category.length > 0 && sorted.map((el) => <option key={el.id} value={el.id}>{el.name}</option>)}
							</select>
						</div>
					}
				</div>
			</div>
			<div className={s.button_form}>
				<h2>{errorText}</h2>
				<button>{query ? 'Изменить' : 'Добавить'}</button>
			</div>
=======
						<select className={s.category}>
							<option value=''>Выберите Категорию</option>
							{category.length > 0 &&
								category.map(el => (
									<option key={el.id} value={el.name}>
										{el.name}
									</option>
								))}
						</select>
					</div>
					<div className={s.right_part_field}>
						<h2>Выберите Подкатегорию</h2>
						<select className={s.subcategory}>
							<option value=''>Выберите Подкатегорию</option>
						</select>
					</div>
				</div>
			</div>
			<button>Добавить</button>
>>>>>>> 9c1faaff (personal profile)
		</form>
	)
}

export default AddProductForm
