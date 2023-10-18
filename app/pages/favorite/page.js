"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import React from 'react'
import style from './favorite.module.scss'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import { FreeMode, Pagination } from 'swiper/modules';
import CourseMake from '../course-make/page.js';
import Heart from "@/app/components/Heart";


function page() {

	const [data, setData] = useState([]); // 숙박 관련 
	const [data2, setData2] = useState([]); // 관광지 관련
	const [data3, setData3] = useState([]); // 음식점 관련
	const [loading, setLoading] = useState(true); //api 불러올떄 관련
	const [apiData, setApiData] = useState([]); // 마커 관련
	/* -------------------------------------------- */
	const [select,setSelct]=useState([]);

	const [aaaa,setAaaa] = useState(null);
	const filterData = (data) => {
		const filteredData1 = data.filter(item => item.contentscd.label === '숙박');
		const filteredData2 = data.filter(item => item.contentscd.label === '관광지');
		const filteredData3 = data.filter(item => item.contentscd.label === '음식점');
		
		setData(filteredData1); // 숙박 관련 데이터 저장
		setData2(filteredData2); // 관광지 관련 데이터 저장
		setData3(filteredData3); // 음식점 관련 데이터 저장
	};
	async function getData() {
		const result = await axios.get('/api/visit');
		const newData = result.data
		filterData(newData);
		setApiData(newData);
		setLoading(false);
	}

	//찜클릭 -------------------------------------------------
	
	
	const isSelected = (itemId) => {
		return select.includes(itemId);
	  }
	const heartclick = (itemId)=>{
		const loginID = window.localStorage.getItem('loginId'); 
		if(loginID){
			if(!isSelected(itemId)){
				axios.post(`/server_api/item`,{profile:loginID,contentsid:itemId})
				.then((response)=>{
					alert("찜목록에 추가되었습니다.");
					setAaaa(response.data);
					setSelct([...select, itemId]);
				})
				.catch((error)=>{console.log('Error:'.error)});
			}
			else{
				axios.delete(`/server_api/item`,{data:{profile:loginID, contentsid:itemId}})
				
				.then((response)=>{
					alert("찜목록에서 제거되었습니다.")
					setAaaa(response.data);
					setSelct(select.filter((item) => item !== itemId));
				})
				.catch((error)=>{console.log('Error:'.error)});
			}
		}
	}
	console.log(data[0]?.contentsid);
	/* ------------------------------------------------------ */

	useEffect(() => {
		getData();
	}, [])
	
	useEffect(() => {
		if(!loading){
			const kakaoMapScript = document.createElement('script')
			kakaoMapScript.async = false
			kakaoMapScript.src = `http://dapi.kakao.com/v2/maps/sdk.js?appkey=700d399006256f95732f06b19c046ba5&autoload=false`
			document.head.appendChild(kakaoMapScript)
		
			let _map;
		
		
			const onLoadKakaoAPI = () => {
				window.kakao.maps.load(() => {
					// 지도 위치 설정
					const container = document.getElementById('maps')
					const options = {
						center: new window.kakao.maps.LatLng(33.3846, 126.5535),
						level: 10,
					}; 
					_map = new window.kakao.maps.Map(container, options)
					
					// 마커 이미지 생성

					const homeflag = '/asset/image/map/ICON_sleep_pin.svg';
					const placeflag = '/asset/image/map/ICON_tour_pin.svg';
					const mealflag = '/asset/image/map/ICON_food_pin.svg';

					function createMarkerImage(imageUrl) {
						return new window.kakao.maps.MarkerImage(
								imageUrl,
								new window.kakao.maps.Size(20, 20), // 마커 이미지 크기
							{ offset: new window.kakao.maps.Point(15, 30) } // 마커 이미지의 중심 좌표 설정
						);
					}

					function selectMarkerImage(data) {
						if (data.contentscd.label === '숙박') {
						  return createMarkerImage(homeflag);
						} else if (data.contentscd.label === '관광지') {
						  return createMarkerImage(placeflag);
						} else if (data.contentscd.label === '음식점') {
						  return createMarkerImage(mealflag);
						}
						// 기본 이미지를 반환하거나 오류 처리를 추가할 수 있습니다.
						return createMarkerImage(defaultMarkerImageUrl);
					  }
			
					  // 마커를 생성하고 위치 및 이미지를 설정
					  const markers = apiData.map((item) => {
						const markerPosition = new window.kakao.maps.LatLng(item.latitude, item.longitude);
						const marker = new window.kakao.maps.Marker({
						position: markerPosition,
						image: selectMarkerImage(item), // 커스텀 마커 이미지 사용
						});
						// 마커를 지도에 추가
						marker.setMap(_map);
						
					});

				});
			};
							
			kakaoMapScript.onload = onLoadKakaoAPI;
		}
	},[loading, apiData]);
 

	if (loading) {
		return <div>로딩 중...</div>;
	}
	return (
		<>

			<div id="maps" style={{ width: '100%', height: '370px' }}></div>

			<div className={style.mid_title}>
				<p>내가 찜한 장소들</p>
				<a href="./course-make"><p className={style.mid_title_p}>코스 만들기</p></a>
			</div>

			<div className={style.whole}>
				<div>
					<div className={style.label}>
						
							<img src="/asset/image/map/ICON_sleep_pin.svg"/>
						
						<p>숙소</p>
					</div>


					<Swiper 
						slidesPerView={3}
						spaceBetween={10}
						freeMode={true}
						pagination={{
						  clickable: true,
						}}
						modules={[FreeMode, Pagination]}
						
						className={style.api_pic_list}>

							
						{data.map((item) => (
							<SwiperSlide className={style.api_pic_whole} key={item.contentsid}>
								
								<a className={style.api_pic_list}>
									<div className={style.api_explain}>
										<p className={style.api_explain_title}>{item.title}</p>
										<Heart itemId={item.contentsid}/>
									</div>
									<p className={style.api_pic_grad}>
									</p>
										<img className={style.api_pic} src={item?.repPhoto?.photoid?.thumbnailpath} alt=""/>
								</a> {/* 여기는 API 불러온 데이터 부분 */}
								
							</SwiperSlide>
						))}
					</Swiper>

				</div>
			
				<div>
					<div className={style.label}>
						<img src="/asset/image/map/ICON_food_pin.svg"/>
						<p>맛집</p>
					</div>
					<Swiper 
						slidesPerView={3}
						spaceBetween={10}
						freeMode={true}
						pagination={{
						  clickable: true,
						}}
						modules={[FreeMode, Pagination]}
						
						className={style.api_pic_list}>

							
						{data3.map((item) => (
							<SwiperSlide className={style.api_pic_whole} key={item.contentsid}>
								<a className={style.api_pic_list}>
									<div className={style.api_explain}>
										<p className={style.api_explain_title}>{item.title}</p>
										<Heart itemId={item.contentsid}/>
									</div>
									<p className={style.api_pic_grad}>
									</p>
										<img className={style.api_pic} src={item?.repPhoto?.photoid?.thumbnailpath} alt=""/>
								</a> {/* 여기는 API 불러온 데이터 부분 */}
								
							</SwiperSlide>
						))}
					</Swiper>
				</div>

				<div>
					<div className={style.label}>
						<img src="/asset/image/map/ICON_tour_pin.svg"/>
						<p>명소</p>
					</div>
					
					<Swiper 
						slidesPerView={3}
						spaceBetween={10}
						freeMode={true}
						pagination={{
						  clickable: true,
						}}
						modules={[FreeMode, Pagination]}
						
						className={style.api_pic_list}>

							
						{data2.map((item) => (
							<SwiperSlide className={style.api_pic_whole} key={item.contentsid}>
								
								<a className={style.api_pic_list}>
									<div className={style.api_explain}>
										<p className={style.api_explain_title}>{item.title}</p>
										<Heart itemId={item.contentsid}/>
									</div>
									<p className={style.api_pic_grad}>
									</p>
										<img className={style.api_pic} src={item?.repPhoto?.photoid?.thumbnailpath} alt=""/>
								</a> {/* 여기는 API 불러온 데이터 부분 */}
								
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			</div>


		</>
		
		);
}

export default page