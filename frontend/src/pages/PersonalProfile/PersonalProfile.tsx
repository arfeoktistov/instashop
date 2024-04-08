import React, { FC, useState } from 'react'
import s from './PersonalProfile.module.scss'
import ikon from '../../assets/Header/ikon.png'
import ProductList from './ProductList/ProductList'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks'
import SuccessfullRequest from '../AddingProduct/SuccessfullRequest/SuccessfullRequest'
import goOut from '../../assets/PersonalProfile/goOut.png'
import { pathLink } from '../../reused'
import { logOutUser } from '../../store/slice/userSlice'
import LogOut from './LogOut/LogOut'

const PersonalProfile: FC = () => {
	const { user } = useAppSelector(state => state.user)
	const [logOut, setLogOut] = useState(false)
	const { error, reboot } = useAppSelector(state => state.addProductSlice)

	return (
		<div className={s.PersonalProfile}>
			<div className={s.profile}>
				<div className={s.user_data}>
					<div className={s.avatar}><img src={(user?.seller_user?.insta_image && user?.seller_user?.insta_image.startsWith('http')) ? user?.seller_user?.insta_image : user?.seller_user?.insta_image ? pathLink + user?.seller_user?.insta_image : ikon} alt="avatar" /></div>
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
		</div>
	)
}

export default PersonalProfile
