import React, { FC, useEffect } from 'react'
import s from './Profile.module.scss'
import arrow from '../../assets/Profile/Icon arrow left.png'
import defBack from '../../assets/Profile/back.png'
import defStatus from '../../assets/Profile/status.png'

import ProfileCard from '../../Component/ProfileCard/ProfileCard'
import SearchDetailView from '../DetailView/DetailViewComponents/SearchDetailView/SearchDetailView'
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks'
import { fetchByDetailProfile, fetchByProfileCard } from '../../store/slice/detailProfileSlice'

import { useNavigate, useParams } from 'react-router-dom'




const Profile: FC = () => {
	const { id } = useParams()

	const dispatch = useAppDispatch()

	useEffect(() => {
		if (id) {
			dispatch(fetchByDetailProfile(+id))
			dispatch(fetchByProfileCard(+id))
		}
	}, [dispatch])


	const { profile, profileCard } = useAppSelector(state => state.profile)

	console.log(profileCard);


	const navigate = useNavigate()

	const goBack = () => {
		navigate(-1)
	}

	return (
		<div className={'container'}>
			<img onClick={goBack} className={s.arrow} src={arrow} alt="arrow" />
			<div className={s.backround} style={{
				backgroundImage: `url(${profile?.main_image ? profile?.main_image : defBack}) `,
				backgroundRepeat: 'no-repeat',
				backgroundSize: '100% 274px',
				borderRadius: 20,
				borderBottomRightRadius: 20,
				borderEndEndRadius: 20,
				objectFit: 'cover',
				objectPosition: 'center'
			}} >
				<div className={s.profileDiv}>
					<img className={s.profile} src={profile?.insta_image ? profile?.insta_image : defStatus} alt="adi" />
					<h1>{profile?.shop_name}</h1>
				</div>
				<div className={s.stats}>
					<div className={s.noLine}>
						<h2>{profile?.product}</h2>
						<h3>products</h3>
					</div>
					<div className={s.line}>
						<h2>{profile?.followers}</h2>
						<h3>bestseller</h3>
					</div>
				</div>
				<a href={profile?.instagram_link}>
					<button>Connect</button>
				</a>

			</div>

			<h2 className={s.newArrivals}>New Arrivals</h2>
			<SearchDetailView />
			<div className={s.fiveCards}>
				{profileCard.length > 0 && profileCard.map(el => <ProfileCard key={el.id} profilCard={el} />)}
			</div>
		</div >
	)
}

export default Profile
