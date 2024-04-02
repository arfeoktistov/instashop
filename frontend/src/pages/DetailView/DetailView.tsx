import React, { FC, useEffect, useState } from 'react';
import './DetailView.scss'

import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import insta from '../../assets/DetailView/ri_instagram-fill.png'
import wh from '../../assets/DetailView/ri_whatsapp-fill.png'
import arrow from '../../assets/Profile/Icon arrow left.png'


// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import { fetchByDetailView, fetchByProfileCard } from '../../store/slice/detailProfileSlice';



const DetailView: FC = () => {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
    const { id } = useParams()
    const dispatch = useAppDispatch()
    console.log(id);

    useEffect(() => {
        if (id) {
            dispatch(fetchByDetailView(+id))
        }
    }, [dispatch, id])

    const { detailview } = useAppSelector(state => state.profile)
    // console.log(profileCard);


    const navigate = useNavigate()

    const goBack = () => {
        navigate(-1)
    }


    return (
        <div className={'container'}>
            <div>

                <img onClick={goBack} className='arrow' src={arrow} alt="arrow" />
            </div>

            <div className='displayOne'>

                <div className='display'>

                    <Swiper

                        loop={true}
                        spaceBetween={10}
                        // navigation={true}
                        thumbs={{ swiper: thumbsSwiper }}
                        modules={[FreeMode, Navigation, Thumbs]}
                        className="mySwiper2"
                    // autoHeight
                    >
                        <SwiperSlide>
                            <img src={detailview?.image} alt="img" />
                        </SwiperSlide>

                        {detailview && detailview?.images.length > 0 &&
                            detailview?.images.map((el, i) => (
                                <SwiperSlide className='cursor' key={i} >
                                    <img src={el.image} />
                                </SwiperSlide>
                            ))
                        }

                    </Swiper>
                    <Swiper
                        onSwiper={setThumbsSwiper}
                        loop={true}
                        spaceBetween={10}
                        slidesPerView={4.5}
                        freeMode={true}
                        watchSlidesProgress={true}
                        modules={[FreeMode, Navigation, Thumbs]}
                        direction='vertical'
                        className="mySwiper"
                    >
                        <SwiperSlide>
                            <img src={detailview?.image} alt="img" />
                        </SwiperSlide>
                        {detailview && detailview?.images.length > 0 &&
                            detailview?.images.map((el, i) => (
                                <SwiperSlide className='cursor' key={i} >
                                    <img src={el.image} />
                                </SwiperSlide>
                            ))
                        }

                    </Swiper>

                </div>
                <div className='detail_info'>
                    <div className='detail_text'>
                        <h1>{detailview?.name}</h1>
                        <h2>{Math.ceil(detailview?.price ? +detailview?.price : 0)} сом</h2>
                        <p>{detailview?.description}</p>
                    </div>
                    <div className='link'>
                        <p>Связатся с продавцом:</p>
                        <div>
                            <Link to={''}>
                                <img src={insta} alt="img" />
                            </Link>
                            <Link to={''}>
                                <img src={wh} alt="img" />
                            </Link>
                        </div>


                    </div>
                </div>
            </div>


        </div >
    );
};

export default DetailView;