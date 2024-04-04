import React, { FC, useEffect, useState } from 'react'
import s from './SearchInput.module.scss'
import glass from '../../../assets/Home/lupa.png'
import CategoryList from './CategoryList/CategoryList'
import { useLocation, useSearchParams } from 'react-router-dom'
import { useAppDispatch } from '../../../store/hooks/hooks'
import { getStoresByCategories } from '../../../store/slice/storesSlice'

const SearchInput: FC = () => {
	const dispatch = useAppDispatch()
	const [show, setShow] = useState(false)
	const [searchParams, setSearchParams] = useSearchParams();
	const [category, setCategory] = useState(searchParams.get('c') || '')
	const [subCategory, setSubCategory] = useState(searchParams.get('sub') || '')
	const location = useLocation()

	const hide = () => {
		setShow(false)
	}

	const handleFilter = (cat_id: string, sub_id: string = '') => {
		setCategory(cat_id)
		setSubCategory(sub_id)
		setSearchParams({ c: cat_id, sub: sub_id })
		hide()
	}

	const clearParams = () => {
		const cat = searchParams.get('c')
		const sub = searchParams.get('sub')
		if (cat || (cat && sub)) {
			searchParams.delete('c')
			searchParams.delete('sub')
			setSearchParams(searchParams)
			setCategory('')
			setSubCategory('')
		}

	}

	useEffect(() => {
		const cat = searchParams.get('c')
		if (cat) {
			setCategory(cat)
		}
		const sub = searchParams.get('sub')
		if (sub) {
			setSubCategory(sub)
		}
	}, [dispatch, location.search])

	useEffect(() => {
		if (category || subCategory) {
			dispatch(getStoresByCategories({ cat_id: category, sub_id: subCategory }))
		}

	}, [dispatch, category, subCategory])

	return (
		<div className={s.SearchInput}>
			{/* <div className={s.input_field}>
				<label className={s.label_for_search}>
					<img className={s.glass} src={glass} alt='glass' />
					<input type='search' placeholder='Find instagram shops by category' />
				</label>
			</div> */}
			<div className={s.category_wrapper}>
				<h2 onClick={() => setShow(!show)} className={s.category_title}>
					Категории <span onClick={() => setShow(!show)} className={s.burger}></span>
				</h2>
				{show && <CategoryList
					clearParams={clearParams}
					handleFilter={handleFilter}
					hide={hide} show={show} />}
			</div>
		</div>
	)
}

export default SearchInput
