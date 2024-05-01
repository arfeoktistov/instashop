import React, { FC, useState } from 'react'
import s from './Header.module.scss'
import ikon from '../../assets/Header/ikon.png'
import Login from '../../pages/Login/Login'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks'
import goose from '../../assets/Header/goose.gif'
import logo from '../../assets/Header/logo.jpg'
import { pathLink } from '../../reused'
import { setLogin } from '../../store/slice/userSlice'

const Header: FC = () => {
	const dispatch = useAppDispatch()
	const { token, user, login } = useAppSelector(state => state.user)
	// console.log(user);
	const handleLogin = (value: boolean) => {
		dispatch(setLogin(value))
	}

	return (
		<header className={s.header}>
			<div className={`container ${s.in_header}`}>
				<Link to={'/'} className={s.title_header}>
					<img className={s.logo} src={logo} alt="logo" />
					<h2 className={s.title}>AGREGAGATOR</h2>
				</Link>
				{/* <div className={s.running_goose}>
					<img src={goose} alt="goose" />
				</div> */}
				<div className={s.header_profile}>
					{
						!token ? <h2 onClick={() => handleLogin(true)} className={s.login}>Войти</h2> :
							<Link to={'/personal_profile'} className={s.user_data}>
								<h2 className={s.nick_name}>{user?.seller_user?.shop_name} </h2>
								<div className={s.avatar}><img src={(typeof user?.seller_user?.main_image === "string" && user?.seller_user?.main_image.startsWith('http')) ? `https${user?.seller_user?.main_image.slice(4)}` : user?.seller_user?.main_image ? pathLink + user?.seller_user?.main_image : ikon} alt="avatar" /></div>
							</Link>
					}
				</div>
			</div>
			{login && <Login login={login} />}
		</header>
	)
}

export default Header
