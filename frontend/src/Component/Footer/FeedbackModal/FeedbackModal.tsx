import React, { Dispatch, FC, SetStateAction, useEffect } from 'react';
import s from './FeedbackModal.module.scss'
import { useAppDispatch, useAppSelector } from '../../../store/hooks/hooks';
import Form from './Form/Form';
import { toggleFeedback } from '../../../store/slice/infoSlice';

interface FeedbackModalProps {
    show: boolean
    setShow: Dispatch<SetStateAction<boolean>>
}

const FeedbackModal: FC<FeedbackModalProps> = ({ show, setShow }) => {
    const dispatch = useAppDispatch()
    const { feedback_success, error } = useAppSelector(state => state.info)

    useEffect(() => {
        if (show) {
            window.history.pushState(null, "", window.location.href);
            window.onpopstate = (e) => {
                setShow(false)
            };
        }
        return () => {
            if (!show) window.history.back();
            window.onpopstate = () => { };
        };
    }, [show, dispatch]);

    useEffect(() => {
        document.addEventListener('keydown', (e) => {
            if (e.code === "Escape") {
                setShow(false)
            }
        })

        return () => {
            document.removeEventListener('keydown', () => { })
            dispatch(toggleFeedback())
        }
    }, [dispatch])
    return (
        <div onClick={() => setShow(false)} className={s.wrapper}>
            <div onClick={(e) => e.stopPropagation()} className={s.container}>
                <h2 className={s.title}>Оставьте заявку.</h2>
                {
                    error ?
                        <h2 className={s.error_text}>{error}</h2>
                        : feedback_success ?
                            <h2 className={s.success}>Ожидайте! С вами свяжутся в близжайшее время.</h2>
                            :
                            <Form />
                }
            </div>
        </div>
    );
};

export default FeedbackModal;