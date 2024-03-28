import React, { FC, useState } from 'react';
import './DetailView.scss'

import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import insta from '../../assets/DetailView/ri_instagram-fill.png'
import wh from '../../assets/DetailView/ri_whatsapp-fill.png'
import first from '../../assets/DetailView/first.png'


// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Link } from 'react-router-dom';


const DetailView: FC = () => {

    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);


    return (
        <div className={'container'}>
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
                            <img src={first} />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src="https://swiperjs.com/demos/images/nature-5.jpg" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src="https://swiperjs.com/demos/images/nature-6.jpg" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src="https://swiperjs.com/demos/images/nature-7.jpg" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src="https://swiperjs.com/demos/images/nature-8.jpg" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src="https://swiperjs.com/demos/images/nature-9.jpg" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src="https://swiperjs.com/demos/images/nature-10.jpg" />
                        </SwiperSlide>
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
                            <img src={first} />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src="https://swiperjs.com/demos/images/nature-5.jpg" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src="https://swiperjs.com/demos/images/nature-6.jpg" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src="https://swiperjs.com/demos/images/nature-7.jpg" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src="https://swiperjs.com/demos/images/nature-8.jpg" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src="https://swiperjs.com/demos/images/nature-9.jpg" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src="https://swiperjs.com/demos/images/nature-10.jpg" />
                        </SwiperSlide>
                    </Swiper>

                </div>
                <div className='detail_info'>
                    <div className='detail_text'>
                        <h1>Boyfriend High Jeans</h1>
                        <h2>$34.99</h2>
                        <p>Jeans in washed superstretch denim with a high waist. Zip fly with button, mock front 2-pockets, and regular 2-back pockets</p>
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

        </div>
    );
};

export default DetailView;