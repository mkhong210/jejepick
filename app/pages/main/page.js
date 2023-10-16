"use client"
import React, { useContext, useEffect } from "react";
import style from "./main.module.scss";
import ListItem from "@/app/components/list/ListItem";
import { MyContext } from "@/app/components/Context";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
// import required modules
import { Autoplay } from 'swiper/modules';

function page() {
	const { common, headStatus, setHeadStatus, btmStatus, setBtmStatus } = useContext(MyContext);
	useEffect(() => {
		setHeadStatus(false);
		setBtmStatus(false);
		common();
	}, []);
	
	return (
		<>
			<div className={style.back}>
				<div className={style.contents_1 + ` inner`}>
					<div>
						<div className={style.contents_1_text_1}>
							<div className={style.contents_1_text_div}>
								'계획대로 되고있어' 천혜향
							</div>
							<p>김혜수님을 위한 제주도 여행정보</p>
						</div>
						<div className={style.weather}>
							<div>
								<div className={style.weather_img}>
									<img src="/asset/image/map/ICON_yellow_pin.svg" />
								</div>
								<div className={style.weather_text}>
									<p>제주특별자치도</p>
									<p><span>26</span><span>˚</span>C<span>맑음</span></p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className={style.contents_2_3_bg}>
				<div className={style.contents_2 + ` inner`}>
					<div className={style.contents_2_text_2}>
						<p>이런 곳도 있어요!</p>
						<p>지금 뜨고 있는 HOT🔥한 장소들!</p>
						<div>
							<span>#서귀포시</span>
							<span>#애월읍</span>
							<span>#제주시</span>
							<span>#성산읍</span>
						</div>
					</div>
					<div className={style.contents_2_bestplacelist}>
						<Swiper
							spaceBetween={20}
							// centeredSlides={true}
							slidesPerView={2.3}
							autoplay={{
								delay: 2500,
								disableOnInteraction: false,
							}}
							modules={[Autoplay]}
							className="mySwiper"
						>
							<SwiperSlide><ListItem /></SwiperSlide>
							<SwiperSlide><ListItem /></SwiperSlide>
							<SwiperSlide><ListItem /></SwiperSlide>
							<SwiperSlide><ListItem /></SwiperSlide>
							<SwiperSlide><ListItem /></SwiperSlide>
							<SwiperSlide><ListItem /></SwiperSlide>
							<SwiperSlide><ListItem /></SwiperSlide>
						</Swiper>
					</div>
				</div>
				<div className={style.contents_3 + ` inner`}></div>
			</div>
		</>
	);
}

export default page;
