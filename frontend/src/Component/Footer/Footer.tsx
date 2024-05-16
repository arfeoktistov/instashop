import React, { FC, useEffect, useState } from 'react'
import s from './Footer.module.scss'
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks'
import { fetchByInfo } from '../../store/slice/infoSlice'
import FeedbackModal from './FeedbackModal/FeedbackModal'
import instagram from '../../assets/DetailView/insta.png'
import whatsapp from '../../assets/DetailView/whatsapp.png'
import footer_ikon from '../../assets/Footer/footer_ikon.png'

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
						<a className={s.whats_app} href={info?.instagram_link} target='_blank' rel='noopener noreferrer'>
							<p>WhatsApp</p>
							<img src={whatsapp} alt="whatsApp" />
						</a>
						<a className={s.instagram} href={`https://wa.me/${info?.phone_number}`} target='_blank' rel='noopener noreferrer'>
							<p>Instagram</p>
							<img src={instagram} alt="instagram" />
						</a>
					</div>
					<div className={s.wrapper__feedback}>
						<button onClick={() => setShow(true)}>
							<span>Хочу стать партнером</span>
							<img src={footer_ikon} alt="footer_ikon" />
						</button>
					</div>
				</div>
				<span className={s.copy}>© GAGAGA HUB 2024</span>
			</footer>
			{show && <FeedbackModal show={show} setShow={setShow} />}
		</>
	)
}

export default Footer
