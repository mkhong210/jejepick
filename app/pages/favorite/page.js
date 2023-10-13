"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import React from 'react'
import style from './favorite.module.scss'

function page() {

	const [selectdata, setSelectData] = useState([]);

	
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get('https://api.visitjeju.net/vsjApi/contents/searchList?apiKey=nn3u13ncqicdt5o0&locale=kr&category=c1');
				setSelectData(response.selectdata.items);
				
			}catch (error) {
				console.error(error);
			}
		};
		fetchData();
		}, [])

	useEffect(() => {
		const kakaoMapScript = document.createElement('script')
		kakaoMapScript.async = false
		kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=700d399006256f95732f06b19c046ba5&autoload=false`
		document.head.appendChild(kakaoMapScript)
	
		var _map;
	
	
		const onLoadKakaoAPI = () => {
			window.kakao.maps.load(() => {
				const container = document.getElementById('maps')
				const options = {
					center: new window.kakao.maps.LatLng(33.3846, 126.5535),
					level: 10,
				};
				_map = new window.kakao.maps.Map(container, options)     
			})
		}
		
		kakaoMapScript.addEventListener('load', onLoadKakaoAPI)
	
	},[])

	return (
		<>
			
			<div id="maps" style={{ width: '100%', height: '370px' }}></div>

			<div>
				<div>내가 찜한 장소들</div>
				<button>코스 만들기</button>
			</div>

			<div>
				<div>
					<div>
						<p><img src="" alt=""/></p>
						<p>숙소</p>
					</div>

					{selectdata.map((item) => (
						<div key={item.contentsid}>
							
							<a href={item.label}>
								<img src={item.repPhoto.photoid.thumbnailpath} alt=""/>
								<div>
									<p>{item.title}</p>
									<button>{/* 하트, 클릭 이벤트 데이터 저장 */}</button>
								</div>
							</a> {/* 여기는 API 불러온 데이터 부분 */}
							
						</div>
					))}
				</div>

				<div>
					<div>
						<p><img src="" alt=""/></p>
						<p>맛집</p>
					</div>
					
					<div>
						<a>
							<img src="" alt=""/>
							<div>
								<p>{/* 불러온 데이터값 자리 */}</p>
								<button>{/* 하트, 클릭 이벤트 데이터 저장 */}</button>
							</div>
						</a> {/* 여기는 API 불러온 데이터 부분 */}
					</div>
				</div>

				<div>
					<div>
						<p><img src="" alt=""/></p>
						<p>명소</p>
					</div>
					
					<div>
						<a>
							<img src="" alt=""/>
							<div>
								<p>{/* 불러온 데이터값 자리 */}</p>
								<button>{/* 하트, 클릭 이벤트 데이터 저장 */}</button>
							</div>
						</a> {/* 여기는 API 불러온 데이터 부분 */}
					</div>
				</div>
			</div>
		</>
	)
}

export default page