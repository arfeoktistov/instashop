import React, { FC, FormEventHandler, useState } from 'react';
import s from '../FeedbackModal.module.scss'
import { useAppDispatch } from '../../../../store/hooks/hooks';
import { FeedbackData } from '../../../../store/modules';
import { fetchByNewFeedback } from '../../../../store/slice/infoSlice';

const Form: FC = () => {
    const dispatch = useAppDispatch()
    const [err, setErr] = useState('')
    const [data, setData] = useState<FeedbackData>({
        name: '',
        phone_number: '',
        instagram_link: '',
        application_text: '',
    })

    const getUserData = (key: string, value: string) => {
        setData({ ...data, [key]: value.trim() })
    }

    const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        setErr('')
        const { name, application_text, phone_number } = data
        if (name.trim().length && application_text.trim().length && phone_number.trim().length) {
            dispatch(fetchByNewFeedback(data))
        } else if (!name.trim().length) {
            setErr('Введите имя')
        } else if (!phone_number.trim().length) {
            setErr('Введите номер телефона')
        } else if (!application_text.trim().length) {
            setErr('Введите текст заявки')
        }
    }

    return (
        <form onSubmit={handleSubmit} className={s.form}>
            <input placeholder='Имя'
                className={`${err.includes('Введите имя') && s.error}`}
                onChange={(e) => getUserData('name', e.target.value)} type="text" />
            <input placeholder='Телефон'
                className={`${err.includes('Введите номер телефона') && s.error}`}
                onChange={(e) => getUserData('phone_number', e.target.value)} type="phone" />
            <input placeholder='Ссылка на инстаграм'
                onChange={(e) => getUserData('instagram_link', e.target.value)} type="text" />
            <textarea placeholder='Заявка'
                className={`${err.includes('Введите текст заявки') && s.error}`}
                onChange={(e) => getUserData('application_text', e.target.value)}></textarea>
            <button>Отправить</button>
        </form>
    );
};

export default Form;