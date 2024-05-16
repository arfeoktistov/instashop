import React, { FC, useEffect } from 'react'
import s from './Loading.module.scss'
import load from '../../assets/Loading/load.png'
const Loading: FC = () => {
	return (
		<div className={s.loading}>
			<img src={load} alt="loadings" />
		</div>
	)
}

export default Loading
