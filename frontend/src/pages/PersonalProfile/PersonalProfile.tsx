import React, { FC } from 'react'
import s from './PersonalProfile.module.scss'
import ikon from '../../assets/Header/ikon.png'
import ProductList from './ProductList/ProductList'
import { NavLink } from 'react-router-dom'
import { useAppSelector } from '../../store/hooks/hooks'
import SuccessfullRequest from '../AddingProduct/SuccessfullRequest/SuccessfullRequest'
import { pathLink } from '../../reused'

const PersonalProfile: FC = () => {
	const { user } = useAppSelector(state => state.user)
	const { error, reboot } = useAppSelector(state => state.addProductSlice)
	return (
		<div className={s.PersonalProfile}>
			<div className={s.profile}>
				<div className={s.avatar}><img src={user?.seller_user?.background_image.startsWith('http') ? user?.seller_user?.background_image : user?.seller_user?.background_image ? pathLink + user?.seller_user?.background_image : ikon} alt="avatar" /></div>
				<div className={s.text_field}>
					<h2>{user?.first_name}</h2>
					<div className={s.path_editing}>
						<NavLink to={'/change_user_profile'}>Редактировать профиль</NavLink>
						<NavLink to={'/adding_product'}>Добавить товар</NavLink>
					</div>
				</div>
			</div>
			<ProductList />
			{(error || reboot) && <SuccessfullRequest id={null} text={'Продукт успешно удалён'} />}
		</div>
	)
}

export default PersonalProfile
