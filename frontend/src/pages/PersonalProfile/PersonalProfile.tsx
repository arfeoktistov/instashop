import React, { FC, useEffect, useState } from 'react'
import s from './PersonalProfile.module.scss'
<<<<<<< HEAD
import ikon from '../../assets/Header/ikon.png'
import ProductList from './ProductList/ProductList'
import { NavLink, Navigate, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../store/hooks/hooks'
import SuccessfullRequest from '../AddingProduct/SuccessfullRequest/SuccessfullRequest'
import { pathLink } from '../../reused'
import LogOut from './LogOut/LogOut'
import { Helmet } from 'react-helmet-async'
import arrow from '../../assets/DetailView/leftArrow.png'
import Loading from '../../Component/Loading/Loading'
=======
import profile from '../../assets/PersonalProfile/Rectangle.png'
import ProductList from './ProductList/ProductList'
import { NavLink } from 'react-router-dom'
>>>>>>> 9c1faaff (personal profile)

const PersonalProfile: FC = () => {
	const navigate = useNavigate()

	const { user } = useAppSelector(state => state.user)
	const [logOut, setLogOut] = useState(false)
	const { error, reboot, loading } = useAppSelector(state => state.addProductSlice)

	const goBack = () => {
		navigate(-1)
	}
	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

	return (
		<div className={s.PersonalProfile}>
<<<<<<< HEAD
			<Helmet>
				<title>{user?.first_name || ''} {user?.last_name || ''} | Профиль G Market</title>
			</Helmet>
			<img onClick={goBack} className='arrow' src={arrow} alt="arrow" />

			<div className={s.profile}>
				<div className={s.user_data}>
					<div className={s.avatar}><img src={(typeof user?.seller_user?.insta_image === "string" && user?.seller_user?.insta_image.startsWith('http')) ? `https${user?.seller_user?.insta_image.slice(4)}` : user?.seller_user?.insta_image ? pathLink + user?.seller_user?.insta_image : ikon} alt="avatar" /></div>
					<div className={s.text_field}>
						<h2>{user?.seller_user?.shop_name}</h2>
						<div className={s.path_editing}>
							<NavLink to={'/change_user_profile'}>Редактировать профиль &#x2710;</NavLink>
							<NavLink to={'/adding_product'}>Добавить товар +</NavLink>
						</div>
						<div onClick={() => setLogOut(true)} className={s.log_out}>
							<h2>Выйти из аккаунта</h2>
						</div>
					</div>
				</div>
				<div onClick={() => setLogOut(true)} className={s.out}>
					<h2>Выйти из аккаунта</h2>
				</div>
			</div>
			<ProductList />
			{(error || reboot) && <SuccessfullRequest id={null} text={'Продукт успешно удалён'} />}
			{logOut && <LogOut logOut={logOut} setLogOut={setLogOut} />}
			{loading && <Loading />}
=======
			<div className={s.profile}>
				<img className={s.avatar} src={profile} alt='girls' />
				<div className={s.text_field}>
					<h2>Название профиля</h2>
					<div className={s.path_editing}>
						<NavLink to={'/adding_product'}>Редактировать профиль</NavLink>
						<NavLink to={'/adding_product'}>Добавить товар</NavLink>
					</div>
				</div>
			</div>
			<ProductList />
>>>>>>> 9c1faaff (personal profile)
		</div>
	)
}

export default PersonalProfile
