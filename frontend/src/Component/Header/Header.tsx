import React, { FC, useState } from 'react'
import s from './Header.module.scss'
import ikon from '../../assets/Header/ikon.png'
import Login from '../../pages/Login/Login'

const Header: FC = () => {
	const [login, setLogin] = useState(false)
	return (
		<div className={s.header}>
			<div className={`container ${s.in_header}`}>
				<div className={s.title_header}>
					<h2 className={s.title}>AGREGAGATOR</h2>
					<h2 className={s.logo}>LOGO</h2>
				</div>
				<div className={s.header_profile}>
					<img onClick={() => setLogin(true)} src={ikon} alt='ikon' />
				</div>
			</div>
			{login && <Login login={login} setLogin={setLogin} />}
		</div>
	)
}

export default Header
