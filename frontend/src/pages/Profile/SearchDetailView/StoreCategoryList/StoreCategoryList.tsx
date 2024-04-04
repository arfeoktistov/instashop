import React, { FC, useEffect, useRef } from 'react';
import s from './StoreCategoryList.module.scss'
import { useParams } from 'react-router-dom';
import List from './List/List';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks/hooks';
import { fetchByProfileCard } from '../../../../store/slice/detailProfileSlice';

interface StoreCategoryListProps {
    show: boolean
    hide: () => void
    handleFilter: (cat_id: string, sub_id?: string) => void
    clearParams: () => void
}

const StoreCategoryList: FC<StoreCategoryListProps> = ({ clearParams, handleFilter, hide, show }) => {
    const { id } = useParams()
    const dispatch = useAppDispatch()
    const { profile_categories } = useAppSelector(state => state.profile)
    const blockRef = useRef<HTMLDivElement | null>(null)

    const allProducts = () => {
        clearParams()
        id && dispatch(fetchByProfileCard(+id))
        hide()
    }

    const toggleBlock = (e: MouseEvent) => {
        const { target } = e
        if (blockRef.current && !blockRef.current.contains(target as Node)
            && target instanceof HTMLElement && !target.className.includes('CategoryList')
            && !target.className.includes('category_title') && !target.className.includes('burger')) {
            hide()
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', toggleBlock)

        return () => document.removeEventListener('mousedown', toggleBlock)
    }, [show, hide])

    return (
        <div ref={blockRef}
            onClick={(e) => e.stopPropagation()}
            className={s.category_block}
        >
            <h4 onClick={allProducts} className={s.all}>Все Товары</h4>
            <ul className={s.list}>
                {
                    profile_categories.length &&
                    profile_categories.map(el => <List handleFilter={handleFilter} key={el.id} {...el} />)
                }
            </ul>
        </div>
    );
};

export default StoreCategoryList;