import React, { FC, useState } from 'react';
import s from './List.module.scss'
import { ICategory } from '../../../../../store/modules';
import plus from '../../../../../assets/CategoryList/plus.png'
import minus from '../../../../../assets/CategoryList/Minus.png'

interface ListProps {
    handleFilter: (cat_id: string, sub_id?: string) => void
}

const List: FC<ListProps & ICategory> = ({ handleFilter, id, name, sub_categories }) => {
    const [openId, setOpenId] = useState<null | number>(null)

    const toggleAnswer = (id: number) => {
        setOpenId(openId === id ? null : id)
    }

    return (
        <div className={s.wrapper}>
            <div className={s.category_name_wrapper}>
                <h4 onClick={() => handleFilter(`${id}`)}>{name}</h4>
                <img onClick={() => toggleAnswer(id)} src={id === openId ? minus : plus} alt="arrow" />
            </div>
            {
                openId === id &&
                <ul className={s.sub_list}>
                    {
                        sub_categories.length &&
                        sub_categories.map(el => (
                            <li
                                onClick={() => handleFilter(`${id}`, `${el.id}`)}
                                key={el.id}>{el.name}</li>
                        ))
                    }
                </ul>
            }
        </div>
    );
};

export default List;