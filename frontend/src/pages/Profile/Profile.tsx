import React, { FC, useEffect } from 'react'
import s from './Profile.module.scss'
import arrow from '../../assets/Profile/Icon arrow left.png'
import back from '../../assets/Profile/back.png'
import adi from '../../assets/Profile/adi.jpg'
import ProfileCard from '../../Component/ProfileCard/ProfileCard'
import SearchDetailView from '../DetailView/DetailViewComponents/SearchDetailView/SearchDetailView'
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks'
import { fetchByDetailProfile } from '../../store/slice/detailProfileSlice'
// import { fetchByDetailProfile } from '../../store/slice/DetailProfileSlice'





const Profile: FC = () => {

	const dispatch = useAppDispatch()

	useEffect(() => {
		if (2) {
			dispatch(fetchByDetailProfile(2))
		}
	}, [dispatch])

	const { profile } = useAppSelector(state => state.profile)

	return (
		<div className={'container'}>
			<img className={s.arrow} src={arrow} alt="arrow" />
			<div className={s.backround} style={{
				backgroundImage: `url(${profile?.main_image}) `,
				backgroundRepeat: 'no-repeat',
				backgroundSize: '100% 224px',
				borderRadius: 20,
				borderBottomRightRadius: 20,
				borderEndEndRadius: 20,
				objectFit: 'cover',
				objectPosition: 'center'
			}} >
				<div className={s.profileDiv}>
					<img className={s.profile} src={profile?.insta_image} alt="adi" />
					<h1>{profile?.shop_name}</h1>
				</div>
				<div className={s.stats}>
					<div className={s.noLine}>
						<h2>500</h2>
						<h3>products</h3>
					</div>
					{/* <div className={s.noLine}>
						<h2>120</h2>
						<h3>categories</h3>
					</div>
					<div className={s.noLine}>
						<h2>8.500</h2>
						<h3>followers</h3>
					</div> */}
					<div className={s.line}>
						<h2>4.75</h2>
						<h3>bestseller</h3>
					</div>
				</div>
				<button>Connect</button>
			</div>

			<h2 className={s.newArrivals}>New Arrivals</h2>
			<SearchDetailView />
			<div className={s.fiveCards}>
				<div className={s.card}>
					<ProfileCard />
				</div>
				<div className={s.card}>
					<ProfileCard />
				</div>
				<div className={s.card}>
					<ProfileCard />
				</div>
				<div className={s.card}>
					<ProfileCard />
				</div>
				<div className={s.card}>
					<ProfileCard />
				</div>
			</div>
		</div >
	)
}

export default Profile
