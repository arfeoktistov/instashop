import React, { FC, useEffect, useState } from 'react';
import './DetailView.scss'

import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import insta from '../../assets/DetailView/pngwing.com.png'
import wh from '../../assets/DetailView/WhatsApp_icon.png'
import arrow from '../../assets/Profile/Icon arrow left.png'

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import { clearDetail, fetchByDetailProfile, fetchByDetailView } from '../../store/slice/detailProfileSlice';
import LightGallery from 'lightgallery/react'
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import { Helmet } from 'react-helmet-async';
import { pathLink } from '../../reused';



const DetailView: FC = () => {
    const navigate = useNavigate()
    const { detailview, profile, error } = useAppSelector(state => state.profile)

    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
    const { id } = useParams()
    const { shop } = useParams()
    const dispatch = useAppDispatch()

    const goBack = () => {
        navigate(-1)
    }

    useEffect(() => {
        if (id) {
            dispatch(fetchByDetailView(+id))
        }
    }, [dispatch, id])
    useEffect(() => {
        if (shop) {
            dispatch(fetchByDetailProfile(+shop))
        }
    }, [dispatch, shop])
    useEffect(() => {
        window.scrollTo(0, 0)

        return () => {
            dispatch(clearDetail())
        }
    }, [])

    return (
        <>
            <Helmet>
                <meta property="og:title" content={`${detailview?.name} | AGREGAGATOR`} />
                <meta name="twitter:title" content={`${detailview?.name} | AGREGAGATOR`} />
                <link rel="canonical" href={`https://agregagator.gagaga.kg/detailview/${id}`} />
                <title>{detailview?.name ? detailview?.name : ''} | AGREGAGATOR</title>
            </Helmet>
            {
                detailview &&
                <LightGallery
                    selector='.gallery_item'
                    speed={500}
                    plugins={[lgThumbnail, lgZoom]}
                >
                    <div className={'container'}>
                        <div>
                            <img onClick={goBack} className='arrow' src={arrow} alt="arrow" />
                        </div>
                        <div className='displayOne'>
                            <div className='display'>
                                <Swiper
                                    loop={detailview && detailview?.images.length > 0 ? true : false}
                                    spaceBetween={10}
                                    thumbs={{ swiper: thumbsSwiper }}
                                    modules={[FreeMode, Navigation, Thumbs]}
                                    className="mySwiper2"
                                >
                                    <SwiperSlide>
                                        <a className='gallery_item' href={detailview?.image.startsWith('http') ? `https${detailview?.image.slice(4)}` : pathLink + detailview?.image}>
                                            <img src={detailview?.image.startsWith('http') ? `https${detailview?.image.slice(4)}` : pathLink + detailview?.image} alt={detailview?.name} />
                                        </a>
                                    </SwiperSlide>
                                    {
                                        error ?
                                            <span className='error animate__backOutUp animate__animated'>{error}</span>
                                            : detailview && detailview?.images.length > 0 &&
                                            detailview?.images.map((el, i) => (
                                                <SwiperSlide className='cursor' key={i} >
                                                    <a className='gallery_item' href={el.image.startsWith('http') ? `https${el.image.slice(4)}` : pathLink + el.image}>
                                                        <img src={el.image.startsWith('http') ? `https${el.image.slice(4)}` : pathLink + el.image} alt={detailview.name} />
                                                    </a>
                                                </SwiperSlide>
                                            ))
                                    }
                                </Swiper>
                                <Swiper
                                    onSwiper={setThumbsSwiper}
                                    spaceBetween={10}
                                    slidesPerView={4.5}
                                    freeMode={true}
                                    watchSlidesProgress={true}
                                    modules={[FreeMode, Navigation, Thumbs]}
                                    direction='vertical'
                                    className="mySwiper"
                                >
                                    <SwiperSlide>
                                        <img src={detailview?.image.startsWith('http') ? `https${detailview?.image.slice(4)}` : pathLink + detailview?.image} alt={detailview.name} />
                                    </SwiperSlide>
                                    {
                                        error ?
                                            <span className='error animate__backOutUp animate__animated'>{error}</span>
                                            : detailview && detailview?.images.length > 0 &&
                                            detailview?.images.map((el, i) => (
                                                <SwiperSlide className='cursor' key={i} >
                                                    <img src={el.image.startsWith('http') ? `https${el.image.slice(4)}` : pathLink + el.image} alt={detailview.name} />
                                                </SwiperSlide>
                                            ))
                                    }
                                </Swiper>
                            </div>
                            <div className='detail_info'>
                                <div className='detail_text'>
                                    <h1>{detailview?.name}</h1>
                                    <h2>{Math.ceil(detailview?.price ? +detailview?.price : 0)} сом</h2>
                                    <div className='detailDisplay'>
                                        <a href={`https://wa.me/${profile?.whatsapp_number}?text=Здравствуйте,%20понравился%20этот%20товар%20на%20сайте%20https://agregagator.gagaga.kg/detailview/${id}/${shop}`} target="_blank" rel='noopener noreferrer'>
                                            <p>Связатся в </p>
                                            <img src={wh} alt="img" />
                                        </a>
                                        <a href={detailview.instagram_link} target="_blank" rel='noopener noreferrer'>
                                            <p>Связатся в </p>
                                            <img className='inst' src={insta} alt="img" />
                                        </a>
                                    </div>
                                    <p>{detailview?.description}</p>
                                </div>
                                {/* <div className='link'>
                                    <p>Связаться с продавцом:</p>

                                </div> */}
                            </div>
                        </div>
                    </div >
                </LightGallery>
            }
        </>
    );
};

export default DetailView;