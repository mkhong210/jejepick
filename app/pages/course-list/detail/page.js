"use client";

import axios from "axios";
import { useEffect, useRef, useState } from "react";
import style from './courseList_id.module.scss'
import { useSearchParams } from "next/navigation";

export default function Home() {

	//======================전 페이지에서 코스 가져오기==================
	// course-list에서 데이터 가져오기
	const param = useSearchParams()
	const idString = param.get('id')
	const idArray = JSON.parse(idString);

	const [apiData, setApiData] = useState();


	// 제주 리스트 api에서 데이터 가져오기
	useEffect(() => {
		axios.get('/api/visit')
			.then((response) => {
				setApiData(response.data);
			})
	}, [])

	useEffect(() => {
		if (apiData && idString) {
			const finaldata = apiData.filter((item) => idArray.includes(item.contentsid));

			return finaldata;
		}
	}, [apiData, idString])

	//===================전 페이지에서 코스 가져오기===========


	//======================경유지 관련 코드 =========================    

	const map = useRef();
	const REST_API_KEY = '6ded06fd9b620e77bf2e95a12ec6f927';
	const url = `/api/map/kakao?origin=127.11015314141542,37.39472714688412&destination=127.10824367964793,37.401937080111644&waypoints=&priority=RECOMMEND&car_fuel=GASOLINE&car_hipass=false&alternatives=false&road_details=false`;


	useEffect(() => {

		const kakaoMapScript = document.createElement('script')
		kakaoMapScript.async = false
		kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=700d399006256f95732f06b19c046ba5&autoload=false`
		document.head.appendChild(kakaoMapScript)


		const loadMap = {
			"origin": {
				"x": "126.519611",
				"y": "33.5098238"
			},
			"destination": {
				"x": "126.2959",
				"y": "33.372234"
			},
			"waypoints": [
				{
					"name": "name0",
					"x": 126.7819256,
					"y": 33.4112985,
				},
				{
					"name": "name0",
					"x": 126.353732,
					"y": 33.4736368
				},
				{
					"name": "name0",
					"x": 126.353732,
					"y": 33.4736368
				}
			],
			"priority": "RECOMMEND",
			"car_fuel": "GASOLINE",
			"car_hipass": false,
			"alternatives": false,
			"road_details": false
		}

		var _map;

		const onLoadKakaoAPI = () => {

			window.kakao.maps.load(() => {
				const container = document.getElementById('map')
				const options = {
					center: new window.kakao.maps.LatLng(33.3846, 126.5535),
					level: 10,
				};
				_map = new window.kakao.maps.Map(container, options)
			})
			//getfn();
			postfn();
		}

		kakaoMapScript.addEventListener('load', onLoadKakaoAPI)

		function postfn() {

			axios.post('/api/map', { loadMap })
				.then(arg => {
					setTimeout(() => {
						let { result_code, summary, sections } = arg?.data?.routes[0];
						if (sections) {
							let allRoads = [], allGuides = [], allMarker = [], allDuration = 0, allDistance = 0;
							sections.forEach(obj => {
								let { distance, duration, guides, roads } = obj;
								allRoads = allRoads.concat(roads);
								allGuides = allGuides.concat(guides);
								allDuration += duration;
								allDistance += distance;
							})
							allMarker = allGuides.filter(obj => {
								if (obj.name == '출발지' | obj.name == '목적지' | obj.name == '경유지') {
									return true;
								}
							})

							let detailRoads = [];
							for (let i = 0; i < allRoads.length; i++) {
								let arg = allRoads[i];
								let mini = arg.vertexes;
								let cursor = 0;
								while (cursor < mini.length) {
									let obj = new kakao.maps.LatLng(mini[cursor + 1], mini[cursor]);
									detailRoads.push(obj);
									cursor = cursor + 2;
									if (cursor >= 1000000) break;
								}

							}

							allGuides = allGuides.map((arg, idx) => {
								let { x, y } = arg;
								if (x && y) {
									arg.position = new kakao.maps.LatLng(arg.y, arg.x);
								}
								return arg;
							});

							let markerImg = [
								'/asset/image/map/ICON_starting_pin.svg',
								'/asset/image/map/ICON_way_pin.svg',
								'/asset/image/map/ICON_final_pin.svg'

							]
							let imageSize = new kakao.maps.Size(24, 35);
							function marker(title, position, n) {
								let image = new kakao.maps.MarkerImage(markerImg[n], imageSize);
								let marker1 = new kakao.maps.Marker({
									map: _map, // 마커를 표시할 지도
									position,
									title: title ? title : '', // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
									image // 마커 이미지 
								});
							}
							let num = 0;
							allMarker.forEach((obj) => {
								obj.name == '출발지' ? num = 0 : num = 1
								marker(obj.title, obj.position, num)
							})

							// 지도에 표시할 선을 생성합니다
							let polyline = new kakao.maps.Polyline({
								//path: arrays.map( arg=> arg.position), // 선을 구성하는 좌표배열 입니다
								path: detailRoads,
								strokeWeight: 5, // 선의 두께 입니다
								strokeColor: 'red', // 선의 색깔입니다
								strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
								strokeStyle: 'solid' // 선의 스타일입니다
							});
							polyline.setMap(_map);

							let customOverlay = new kakao.maps.CustomOverlay({
								position: new kakao.maps.LatLng(allGuides[allGuides.length - 1].y + 0.0012, allGuides[allGuides.length - 1].x),
								content: `<div class ="label">거리, 시간 : ${allDistance}mm, ${allDuration}초</div>`
							});

							customOverlay.setMap(_map);


						}


					}, 1000);

				})
		}

		/* function getfn(){
				axios.get(url)
				.then(arg => {
						setTimeout(()=>{
								let {result_code, summary, sections} = arg?.data?.routes[0];
								console.log(arg)
								if(sections[0]){
										let {distance, duration, guides : arrays, roads} = sections[0];  //distance : 미터단위, duration : 초 단위
									  
										let detailRoads = [];
		
										for(let i=0;i < roads.length;i++){
												let arg = roads[i];
												let mini = arg.vertexes;
												let cursor = 0;
												while(cursor < mini.length){
														let obj = new kakao.maps.LatLng(mini[cursor+1], mini[cursor]);
														detailRoads.push(obj);
														cursor = cursor + 2;
														if(cursor >= 1000000) break;
												}                             
										}
										arrays = arrays.map( (arg, idx)=>{
												let{x, y}  = arg;
												if(x && y){
														arg.position = new kakao.maps.LatLng(arg.y, arg.x);
												}
												return arg;
										});          
		
										console.log(detailRoads,'detailRoads--------------')
										console.log(arrays, 'arrays-----------------');
										console.log(roads,'roads---------------');
											  
										let { title, position} = arrays[0];
										// 마커 이미지의 이미지 크기 입니다
										let imageSize = new kakao.maps.Size(24, 35);
										// 마커 이미지를 생성합니다    
										let image = new kakao.maps.MarkerImage('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/red_b.png', imageSize);
										// 마커를 생성합니다
										let marker1 = new kakao.maps.Marker({
												map: _map, // 마커를 표시할 지도
												position,
												title: title? title : '', // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
												image // 마커 이미지 
										});
		
										let {title : title2, position : position2} = arrays[arrays.length-1];
										// 마커 이미지의 이미지 크기 입니다
										// 마커 이미지를 생성합니다    
										let image2 = new kakao.maps.MarkerImage('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/blue_drag.png', imageSize);
										// 마커를 생성합니다
										let marker2 = new kakao.maps.Marker({
												map: _map, // 마커를 표시할 지도
												position : position2,
												title: title2? title2 : '', // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
												image : image2 // 마커 이미지 
										});                   
											  
										// 지도에 표시할 선을 생성합니다
										let polyline = new kakao.maps.Polyline({
												//path: arrays.map( arg=> arg.position), // 선을 구성하는 좌표배열 입니다
												path : detailRoads,
												strokeWeight: 5, // 선의 두께 입니다
												strokeColor: 'red', // 선의 색깔입니다
												strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
												strokeStyle: 'solid' // 선의 스타일입니다
										});
		
										// 지도에 선을 표시합니다 
										polyline.setMap(_map);                      
		
										let customOverlay = new kakao.maps.CustomOverlay({
												position: new kakao.maps.LatLng(37.39843974939604, 127.10972941510465),
												content: `<div class ="label">거리, 시간 : ${distance}, ${duration}</div>`
										});
		
										// 커스텀 오버레이를 지도에 표시합니다
										customOverlay.setMap(_map);
		
										//지우는 방법
										// setTimeout(() => {
										//     polyline.setMap(null);
										//     customOverlay.setMap(null);
										//     marker1.setMap(null);
										//     marker2.setMap(null);
										// }, 3000);
								}
						},3000);
				}).catch(err => {
						console.log(err)
				});
		}
		 */
	}, [])

	//======================경유지 관련 코드 =========================


	return (
		<div className={style.main}>
			<div id="map" style={{ width: '100%', height: '370px' }}></div>
			<div className={style.frame}>
				<p>내가만든 제일 좋은 여행 코스!</p>
				<div className={style.title}>
					<img src=""></img>
					<h1>노진구{/* 닉네임 들어갈예정 */}의 1일차 여행 코스</h1>
				</div>

				<div className={style.sec1}>
					<span></span>
					<div className={style.sec2}>
						<p>
							도라에몽의 음식점{/* 이름 들어갈 예정*/}
						</p>
						<span></span>
						<p>
							{/* 가게의 라벨 들어갈예정 */}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
