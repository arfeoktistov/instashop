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
	return (
		<form onSubmit={handleAddProduct} className={s.add_form}>
			<div className={s.field_to_fill}>
				<div className={s.left_part}>
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
					</div>
				</div>
				<div className={s.right_part}>
					<div className={s.right_part_field}>
						<h2>Выберите Категорию</h2>
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
		</form>
	)
}

export default AddProductForm
