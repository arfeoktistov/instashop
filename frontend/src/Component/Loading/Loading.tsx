import React, { FC, useEffect } from 'react'
import s from './Loading.module.scss'
import load from '../../assets/Loading/load.png'
const Loading: FC = () => {
	useEffect(() => {
		// При рождении убрать скрол
		document.body.style.overflow = 'hidden'
		return () => {
			// При закрытии  модального окна вернуть скролл
			document.body.style.overflow = 'auto'
		}
	}, [])

	return (
		<div className={s.loading}>
			<img src={load} alt="loadings" />
		</div>
	)
}

export default Loading
