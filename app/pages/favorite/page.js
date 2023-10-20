"use client";

import axios from "axios";
import { useContext, useEffect, useState } from "react";
import React from 'react'
import style from './favorite.module.scss'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import { FreeMode, Pagination } from 'swiper/modules';
import ListItem from "@/app/components/list/ListItem";
import Loading from "@/app/components/loading/Loading";
import { useRouter } from "next/navigation";
import { Router } from "next/router";
import { MyContext } from "@/app/components/Context";

function page() {

	const [data, setData] = useState([]); // 숙박 관련 
	const [data2, setData2] = useState([]); // 관광지 관련
	const [data3, setData3] = useState([]); // 음식점 관련
	const [loading, setLoading] = useState(true); //api 불러올떄 관련
	const [apiData, setApiData] = useState([]); // 마커 관련
	/* -------------------------------------------- */
	const [localx,setLocalx] =useState(null);
	const [loginID,setloginID]=useState(null);
	const [JejuData,setJejuData]=useState([]);
	const {isStatus,setIsStatus} = useContext(MyContext);
	/* -------------------------------------------- */
	
	/* useEffect(() => {
		if(typeof window !== 'undefined') {
			setloginID(loginID);
		}
	}, [loginID]) */
	const Login1 =()=>{
		const a = localStorage.getItem('loginId');
		console.log(a);
		setloginID(a)
	}

	const filterData = (data) => {
		const filteredData1 = data.filter(item => item.contentscd.label === '숙박');
		const filteredData2 = data.filter(item => item.contentscd.label === '관광지');
		const filteredData3 = data.filter(item => item.contentscd.label === '음식점');
		setData(filteredData1);
		setData2(filteredData2);
		setData3(filteredData3);
	};

	async function getData() {
		const result = await axios.get('/api/visit');
		const newData = result.data
		setJejuData(newData);
		//filterData(newData);
		setApiData(newData);
		setLoading(false);
	}

	/* --데이터 필터링 요청-- */
	useEffect(() => {
		getData();
		Login1();
	}, [])
	/* --지도 요청 및 로딩 요청-- */
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
								new window.kakao.maps.Size(30, 30), // 마커 이미지 크기
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
	
/* ------------------------------- */

	/* --비짓제주 api데이터 요청-- */
	
	/* --서버 데이터 요청-- */
	useEffect(()=>{
		loginID &&
		axios.get(`/server_api/item?profile=${loginID}`)
		.then((response)=>{console.log(response);setLocalx(response.data);})
		.catch((error)=>{console.log('Error:'.error)});
	},[loginID,isStatus])

	useEffect(()=>{
		if(JejuData.length && localx){ //전체데이터와 찜한데이터가 있다면
			const localxContentsIds = localx.map(item => item.contentsid); //찜한데이터에서 contentsid가 있는걸 가져옴
			const filtercontentsid=JejuData.filter((item)=>localxContentsIds.includes(item.contentsid))
			// console.log(worldofwarcraft);
			// filterData(filtercontentsid);
			// setA(filtercontentsid)
			console.log(localx);
			
			filterData(filtercontentsid); 
			setApiData(filtercontentsid);
			
		}
	},[JejuData,localx])
	/* ------------------------------- */
	const router = useRouter();
	const moveList = () => {
		router.push("/pages/list");
	}
	if (loading) {
		return <div><Loading /></div>;
	}
	return (
		<>
			<div id="maps" style={{ width: '100%', height: '370px' }}></div>
			<div className={style.mid_title+ ` inner`}>
				<p>내가 찜한 장소들</p>
				<a href="./course-make" className={style.mid_title_a}>
					<p className={style.mid_title_p}>코스 만들기</p>
					<img src="/asset/common/Icon_arrow_right.svg" alt="오른쪽 화살표" />
				</a>
			</div>
			<div className={style.whole+ ` inner`}>
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
						
						
						{data.length?
						data.map((item) => (
							<SwiperSlide className={style.api_pic_whole} key={item.contentsid}>
								<ListItem data={item} />
								{/* {
									localx?.map((item,index)=>(
										
										<div key={index}>
											<p>{item.contentsid}</p>
										</div>
										
									)
									)
								} */}
								{/* <a className={style.api_pic_list}>
									<div className={style.api_explain}>
										<p className={style.api_explain_title}>{item.title}</p>
										<Heart itemId={item.contentsid}/>
									</div>
									<p className={style.api_pic_grad}>
									</p>
										<img className={style.api_pic} src={item?.repPhoto?.photoid?.thumbnailpath} alt=""/>
								</a> 여기는 API 불러온 데이터 부분 */}
							</SwiperSlide>
						)):
						(
							<p onClick={moveList} className={style.heartlistnone}>찜하러 가기</p>
						)}
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
						{data3.length?
						data3.map((item) => (
							<SwiperSlide className={style.api_pic_whole} key={item.contentsid}>
								<ListItem data={item} />
							</SwiperSlide>
						)):(
							<p onClick={moveList} className={style.heartlistnone}>찜하러 가기</p>
						)
						}
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
						
						{
						data2.length?
						data2.map((item) => (
							<SwiperSlide className={style.api_pic_whole} key={item.contentsid}>
								<ListItem data={item} />
							</SwiperSlide>
						)):(
							<p onClick={moveList} className={style.heartlistnone}>찜하러 가기</p>
						)}
					</Swiper>
				</div>
			</div>


		</>
		
		);
}

export default page