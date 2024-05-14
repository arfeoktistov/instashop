import React, { FC, useEffect } from 'react'
import s from './Loading.module.scss'
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
			<div className={s.spinner}></div>
		</div>
	)
}

export default Loading
