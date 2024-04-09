import React, { FC, useEffect } from 'react'
import s from './Profile.module.scss'
import arrow from '../../assets/Profile/Icon arrow left.png'
import defBack from '../../assets/Profile/back.png'
import defStatus from '../../assets/Profile/status.png'
import ProfileCard from '../../Component/ProfileCard/ProfileCard'
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks'
import { clearProfile, fetchByDetailProfile, fetchByProfileCard, fetchByProfileCategories } from '../../store/slice/detailProfileSlice'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import SearchDetailView from './SearchDetailView/SearchDetailView'
import { Helmet } from 'react-helmet-async'

const Profile: FC = () => {
	const { id } = useParams()
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const { profile, profileCard, error } = useAppSelector(state => state.profile)
	const [searchParams] = useSearchParams()

	useEffect(() => {
		window.scrollTo(0, 0)

		if (id) {
			dispatch(fetchByDetailProfile(+id))
			!searchParams.get('c_store') && dispatch(fetchByProfileCard(+id))
			dispatch(fetchByProfileCategories(+id))
		}

		return () => {
			dispatch(clearProfile())
		}
	}, [dispatch])

	const goBack = () => {
		if (searchParams.get('c') || (searchParams.get('c') && searchParams.get('sub'))) {
			navigate(`/?c=${searchParams.get('c')}&sub=${searchParams.get('sub')}`)
		} else {
			navigate('/')
		}
	}

	return (
		<div >
			{
				profile &&
				<>
					<Helmet>
						<meta property="og:title" content={`${profile?.shop_name} | AGREGAGATOR`} />
						<meta name="twitter:title" content={`${profile?.shop_name} | AGREGAGATOR`} />
						<link rel="canonical" href={`http://agregagator.gagaga.kg/profile/${id}?c=${searchParams.get('c') || ''}&sub=${searchParams.get('sub') || ''}`} />
						<title>{`${profile?.shop_name ? profile?.shop_name : ''} | AGREGAGATOR`}</title>
					</Helmet>
					<img onClick={goBack} className={s.arrow} src={arrow} alt="arrow" />
					<div className={s.backround} style={{
						backgroundImage: `url(${profile?.background_image ? profile?.background_image : defBack}) `
					}}>
						<div className={s.profileDiv}>
							<img className={s.profile} src={profile?.insta_image ? profile?.insta_image : defStatus} alt="insta_photo" />
							<h1>{profile?.shop_name}</h1>
						</div>
						<div className={s.stats}>
							<div className={s.noLine}>
								<h2>{profile?.product}</h2>
								<h3>products</h3>
							</div>
							<div className={s.line}>
								<h2>{profile?.followers}</h2>
								<h3>followers</h3>
							</div>
						</div>
						<a href={profile?.instagram_link} target="_blank" rel='noopener noreferrer'>
							<button>Instagram</button>
						</a>
					</div>

					<h2 className={s.newArrivals}>Товары</h2>
					<SearchDetailView />
					<div className={s.fiveCards}>
						{
							error ?
								<span className='error animate__backOutUp animate__animated'>{error}</span>
								:
								profileCard.length > 0 && profileCard.map(el => <ProfileCard key={el.id} profilCard={el} />)}
					</div>
				</>
			}
		</div >
	)
}

export default Profile
