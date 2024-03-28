import React, { FC } from 'react'
import s from './SearchInput.module.scss'
import glass from '../../../assets/Home/lupa.png'

const SearchInput: FC = () => {
	return (
		<div className={s.SearchInput}>
			<div className={s.input_field}>
				<label className={s.label_for_search}>
					<img className={s.glass} src={glass} alt='glass' />
					<input type='search' placeholder='Find instagram shops by category' />
				</label>
			</div>
			<h2 className={s.category}>Категории</h2>
		</div>
	)
}

export default SearchInput
