import React, { FC, useEffect, useState } from 'react'
import s from './Footer.module.scss'
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks'
import { fetchByInfo } from '../../store/slice/infoSlice'
import FeedbackModal from './FeedbackModal/FeedbackModal'

const Footer: FC = () => {
	const { info } = useAppSelector(state => state.info)
	const dispatch = useAppDispatch()
	const [show, setShow] = useState(false)

	useEffect(() => {
		dispatch(fetchByInfo())
	}, [dispatch])
	return (
		<>
			<footer className={s.footer}>
				<div className={`${s.wrapper} container`}>
					<div className={s.wrapper__links}>
						<a href={info?.instagram_link} target='_blank' rel='noopener noreferrer'>Наш Instagram</a>
						<a href={`https://wa.me/${info?.phone_number}`} target='_blank' rel='noopener noreferrer'>Наш WhatsApp</a>
					</div>
					<div className={s.wrapper__feedback}>
						<button onClick={() => setShow(true)}>Хочу стать партнером</button>
					</div>
				</div>
				<span className={s.copy}>© GAGAGA HUB 2024</span>
			</footer>
			{show && <FeedbackModal show={show} setShow={setShow} />}
		</>
	)
}

export default Footer
