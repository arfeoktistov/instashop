import React, { FC } from 'react';
import s from './SearchDetailView.module.scss'
import lupa from '../../../../assets/Profile/l.jpg'
import { Link } from 'react-router-dom';

const SearchDetailView: FC = () => {
    return (

        <div className={s.SearchInput}>
            <div className={s.input_field}>
                <label className={s.label_for_search}>
                    <img className={s.glass} src={lupa} alt='lupa' />
                    <input type='search' placeholder='Find instagram shops by category' />
                </label>
            </div>
            <h2 className={s.category}>Категории</h2>
        </div>


    );
};

export default SearchDetailView;