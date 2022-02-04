import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';

import 'swiper/css';
import "swiper/css/pagination";

interface Props {
    slides: Array<HTMLMediaElement>
}

export default function Slider({ slides }: Props) {
    return (
        <Swiper
            spaceBetween={0}
            slidesPerView={1}
            navigation
            pagination={{
                dynamicBullets: true,
                clickable: true
            }}
            modules={[Pagination]}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
        >
            {slides.map((media: HTMLMediaElement, i: number) => (
                <SwiperSlide key={i}>{media}</SwiperSlide>
            ))}
            <div className='swiper-pagination'>
            </div>
        </Swiper>
    );
}