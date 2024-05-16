import React, { FC, useEffect, useState } from 'react';
import s from './SearchDetailView.module.scss'
import lupa from '../../../../assets/Profile/l.jpg'
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import StoreCategoryList from './StoreCategoryList/StoreCategoryList';
import { useAppDispatch } from '../../../store/hooks/hooks';
import { fetchByCardsByCategories } from '../../../store/slice/detailProfileSlice';

const SearchDetailView: FC = () => {
    const { id } = useParams()
    const dispatch = useAppDispatch()
    const [show, setShow] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams();
    const [category] = useState(searchParams.get('c') || '')
    const [subCategory] = useState(searchParams.get('sub') || '')
    const [categoryStore, setCategoryStore] = useState(searchParams.get('c_store') || '')
    const [subCategoryStore, setSubCategoryStore] = useState(searchParams.get('sub_store') || '')
    const location = useLocation()

    const hide = () => {
        setShow(false)
    }

    const handleFilter = (cat_id: string, sub_id: string = '') => {
        setCategoryStore(cat_id)
        setSubCategoryStore(sub_id)
        setSearchParams({ c: category, sub: subCategory, c_store: cat_id, sub_store: sub_id })
        hide()
    }

    const clearParams = () => {
        const cat = searchParams.get('c_store')
        const sub = searchParams.get('sub_store')
        if (cat || (cat && sub)) {
            searchParams.delete('c_store')
            searchParams.delete('sub_store')
            setSearchParams(searchParams)
            setCategoryStore('')
            setSubCategoryStore('')
        }

    }

    useEffect(() => {
        const cat = searchParams.get('c_store')
        if (cat) {
            setCategoryStore(cat)
        }
        const sub = searchParams.get('sub_store')
        if (sub) {
            setSubCategoryStore(sub)
        }
    }, [dispatch, location.search])

    useEffect(() => {
        if ((categoryStore || subCategoryStore)) {
            id && dispatch(fetchByCardsByCategories({ id, cat_id: categoryStore, sub_id: subCategoryStore }))
        }

    }, [dispatch, categoryStore, subCategoryStore])

    return (

        <div className={s.SearchInput}>
            {/* <div className={s.input_field}>
                <label className={s.label_for_search}>
                    <img className={s.glass} src={lupa} alt='lupa' />
                    <input type='search' placeholder='Find instagram shops by category' />
                </label>
            </div> */}
            <div className={s.category_wrapper}>
                <h2
                    onClick={() => setShow(!show)}
                    className={s.category_title}>Категории магазина <span onClick={() => setShow(!show)} className={s.burger}></span></h2>
                {show && <StoreCategoryList
                    clearParams={clearParams}
                    handleFilter={handleFilter}
                    hide={hide} show={show}
                />}
            </div>
        </div>


    );
};

export default SearchDetailView;