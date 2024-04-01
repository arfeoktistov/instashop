import React, { FC, useEffect, useRef } from 'react';
import s from './CategoryList.module.scss'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks/hooks';
import List from './List/List';
import { getAllStores } from '../../../../store/slice/storesSlice';

interface CategoryListProps {
    show: boolean
    hide: () => void
    handleFilter: (cat_id: string, sub_id?: string) => void
    clearParams: () => void
}

const CategoryList: FC<CategoryListProps> = ({ clearParams, handleFilter, hide, show }) => {
    const dispatch = useAppDispatch()
    const { all_categories } = useAppSelector(state => state.stores)
    const blockRef = useRef<HTMLDivElement | null>(null)

    const allStores = () => {
        clearParams()
        dispatch(getAllStores())
        hide()
    }

    const toggleBlock = (e: MouseEvent) => {
        const { target } = e
        if (blockRef.current && !blockRef.current.contains(target as Node)
            && target instanceof HTMLElement && !target.className.includes('CategoryList') && !target.className.includes('category')) {
            hide()
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', toggleBlock)

        return () => document.removeEventListener('mousedown', toggleBlock)
    }, [show, hide])


    return (
        <div
            ref={blockRef}
            onClick={(e) => e.stopPropagation()}
            className={s.category_block}
        >
            <h4 onClick={allStores} className={s.all}>Все Магазины</h4>
            <ul className={s.list}>
                {
                    all_categories.length &&
                    all_categories.map(el => <List handleFilter={handleFilter} key={el.id} {...el} />)
                }
            </ul>
        </div>
    );
};

export default CategoryList;