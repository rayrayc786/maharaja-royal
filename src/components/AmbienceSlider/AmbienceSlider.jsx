import { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';

import 'swiper/css';
import './AmbienceSlider.css';

import galleryImg1 from '../../assets/IMG_20260827_114647_090.jpg';
import galleryImg2 from '../../assets/IMG_20260827_114651_868.jpg';
import galleryImg3 from '../../assets/IMG_20260827_114656_411.jpg';
import galleryImg4 from '../../assets/1000758996.png';

const slides = [
  {
    id: 1,
    image: galleryImg4,
    title: 'FRESH FLAVORS. GREAT COMPANY',
    description: 'Authentic Indian cuisine and a welcoming space for friends and family',
  },
  {
    id: 2,
    image: galleryImg1,
    title: 'VIBRANT DINING ATMOSPHERE',
    description: 'Modern interiors, warm lighting, and the perfect setting to relax and enjoy',
  },
  {
    id: 3,
    image: galleryImg2,
    title: 'A ROYAL CULINARY EXPERIENCE',
    description: 'Every dish is crafted with devotion — a celebration of Indian royal heritage',
  },
  {
    id: 4,
    image: galleryImg3,
    title: 'A ROYAL CULINARY EXPERIENCE',
    description: 'Every dish is crafted with devotion — a celebration of Indian royal heritage',
  },
];

export const AmbienceSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);
  const total = slides.length;

  return (
    <section className="ambience-section" aria-label="Restaurant gallery">
      <div className="ak-height-150 ak-height-lg-60"></div>
      
      <div className="ambience-slider-wrapper">
        <Swiper
          modules={[Navigation, Autoplay]}
          loop={true}
          initialSlide={0}
          slidesPerView={1.35}
          spaceBetween={24}
          speed={700}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            swiper.slideToLoop(0, 0);
          }}
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.realIndex);
          }}
          breakpoints={{
            0: { slidesPerView: 1.1, spaceBetween: 12 },
            576: { slidesPerView: 1.15, spaceBetween: 16 },
            768: { slidesPerView: 1.25, spaceBetween: 20 },
            1200: { slidesPerView: 1.35, spaceBetween: 24 },
          }}
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="ambience-slide">
                <div className="ambience-slide-img">
                  <img src={slide.image} alt={slide.title} />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        
        <div className="container mx-auto px-4">
          <div className="ambience-controls">
            <div className="ambience-title">
              <div className="ambience-title-content">
                <h6 className="ambience-title-text">
                  {slides[activeIndex]?.title}
                </h6>
                <p className="ambience-subtitle-text">
                  {slides[activeIndex]?.description}
                </p>
              </div>
            </div>
            
            <div className="ambience-nav">
              <button
                className="ambience-nav-btn"
                onClick={() => swiperRef.current?.slidePrev()}
                aria-label="Previous slide"
              >
                <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.657 11.657L0 6L5.657 0.343M0 6H17" stroke="currentColor" stroke-width="1.2"></path>
                </svg>
              </button>
              
              <span className="ambience-nav-counter">
                {activeIndex + 1} / {total}
              </span>
              
              <button
                className="ambience-nav-btn"
                onClick={() => swiperRef.current?.slideNext()}
                aria-label="Next slide"
              >
                <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.043 0.343L17.7 6L12.043 11.657M17.7 6H0.7" stroke="currentColor" stroke-width="1.2"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
