import React, { FC, useEffect } from 'react'
import s from './Footer.module.scss'
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks'
import { fetchByInfo } from '../../store/slice/infoSlice'

const Footer: FC = () => {
	const { info } = useAppSelector(state => state.info)
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(fetchByInfo())
	}, [dispatch])
	return (
		<footer className={s.footer}>
			<div className={`${s.wrapper} container`}>
				<div className={s.wrapper__links}>
					<a href={info?.instagram_link} target='_blank' rel='noopener noreferrer'>Наш инстаграм!</a>
					<a href={`tel:${info?.phone_number}`}>Телефон: {info?.phone_number}</a>
				</div>
				<div className={s.wrapper__feedback}>
					<button>Хочу стать партнером.</button>
				</div>
			</div>
			<span className={s.copy}>© GAGAGA HUB 2024</span>
		</footer>
	)
}

export default Footer
