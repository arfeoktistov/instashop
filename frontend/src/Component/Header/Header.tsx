import React, { FC, useState } from 'react'
import s from './Header.module.scss'
import ikon from '../../assets/Header/ikon.png'
import Login from '../../pages/Login/Login'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../store/hooks/hooks'
import goose from '../../assets/Header/goose.gif'

const Header: FC = () => {
	const [login, setLogin] = useState(false)
	const { token } = useAppSelector(state => state.user)
	return (
		<div className={s.header}>
			<div className={`container ${s.in_header}`}>
				<Link to={'/'} className={s.title_header}>
					<h2 className={s.title}>AGREGAGATOR</h2>
					{/* <h2 className={s.logo}>LOGO</h2> */}
				</Link>
				<div className={s.running_goose}>
					<img src={goose} alt="goose" />
				</div>
				<div className={s.header_profile}>
					{
						!token ? <img onClick={() => setLogin(true)} src={ikon} alt='ikon' /> :
							'@'
					}
				</div>
			</div>
			{login && <Login login={login} setLogin={setLogin} />}
		</div>
	)
}

export default Header
