"use client"
import React, { useContext, useEffect } from "react";
import style from "./main.module.scss";
import { MyContext } from "@/app/components/Context";
import Weather from "@/app/components/weather/Weather";
import CourseList from "@/app/components/course/CourseList";
import Mainswiper from "@/app/components/mainswiper/Mainswiper";

function page() {
	const { status, headStatus, setHeadStatus, btmStatus, setBtmStatus } = useContext(MyContext);

	useEffect(() => {
		setHeadStatus(false);
		setBtmStatus(false);
		status();
		height();
	}, []);

	const height = () => {
		const totalItems = document.getElementsByClassName(`${style.contents_2_bestplacelist}`);
		console.log(totalItems);

		for (let i = 0; i < totalItems.length; i++) {
			const item = totalItems[i];
			const children = item.children;

			if (children.length > 0) {
				// const child = children[0].children[0].children;
				// for (let i = 0; i < child.length; i++) {
				// 	const childc = child[i].children[0];
				// 	childc.classList.add('child')
				// }
			}
		}
	}

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
								<div className={style.weather_text_wrap}>
									<p>제주특별자치도</p>
									<p className={style.weather_text}><Weather /></p>
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
						<Mainswiper />
						{/* <Swiper
							spaceBetween={20}
							slidesPerView={2.3}
							loop={true}
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
						</Swiper> */}
					</div>
				</div>
				<div className={style.contents_3 + ` inner`}>
					<div className={style.text_wrap}>
						<h2>나의 여행코스</h2>
						<p>더보기</p>
					</div>
					<div className={style.course_wrap}>
						{/* <CourseList /> */}
					</div>
				</div>
			</div>
		</>
	);
}

export default page;
