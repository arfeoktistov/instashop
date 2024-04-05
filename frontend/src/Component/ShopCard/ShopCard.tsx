import React, { FC } from 'react'
import s from './ShopCard.module.scss'
import Image from '../../assets/Home/Image5.png'
import { IStores } from '../../store/modules'
import { Link, useSearchParams } from 'react-router-dom'
import { Tilt } from 'react-tilt'
import { pathLink } from '../../reused'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const defaultOptions = {
	reverse: true,  // reverse the tilt direction
	max: 20,     // max tilt rotation (degrees)
	perspective: 2000,   // Transform perspective, the lower the more extreme the tilt gets.
	scale: 1.05,    // 2 = 200%, 1.5 = 150%, etc..
	speed: 1000,   // Speed of the enter/exit transition
	transition: true,   // Set a transition on enter/exit.
	axis: null,   // What axis should be disabled. Can be X or Y.
	reset: true,    // If the tilt effect has to be reset on exit.
	easing: "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
}


const ShopCard: FC<IStores> = ({ id, main_image, mini_description, shop_name }) => {
	const [searchParams] = useSearchParams()

	return (
		<Tilt className={s.card} options={defaultOptions} >
			<Link to={`/profile/${id}?c=${searchParams.get('c') || ''}&sub=${searchParams.get('sub') || ''}`}>
				<div className={s.image_shop}>
					<LazyLoadImage
						alt={`${shop_name}`}
						effect="blur"
						src={`${main_image?.startsWith('http') ? main_image : pathLink + main_image}`}
						className={s.image}
					/>
					{/* <div className={s.up_field}>
						<div className={s.top_up_field}>
							<p className={s.description}>
								{mini_description.length > 80 ? mini_description?.slice(0, 80) + '...' : mini_description}
							</p>
							<h2>Handpicked items for you</h2>
							<Link
							to={`/profile/${id}?c=${searchParams.get('c') || ''}&sub=${searchParams.get('sub') || ''}`}
							className={s.shop_link}>Перейти...</Link>
						</div>
					</div> */}
				</div>
				<div className={s.name_block}>
					<h2 title={"@" + shop_name}>@{shop_name}</h2>
					<p
						title={mini_description}
						className={s.description}>
						{mini_description.length > 80 ? mini_description?.slice(0, 80) + '...' : mini_description}
					</p>
				</div>
			</Link>
		</Tilt>
	)
}

export default ShopCard
