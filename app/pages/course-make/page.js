"use client";

import axios from "axios";
import { useEffect, useState, useRef } from "react";
import React from 'react'
import style from './courseMake.module.scss'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import { FreeMode, Pagination } from 'swiper/modules';


function page() {
	

	const [data, setData] = useState(); // 숙박 관련 
	const [data2, setData2] = useState(); // 관광지 관련
	const [data3, setData3] = useState(); // 음식점 관련
	const [loading, setLoading] = useState(true);
	const [selectedItems, setSelectedItems] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedItemContent, setSelectedItemContent] = useState('');
	const [modalTitle, setModalTitle] = useState('');
	
	function openModal() {
		setIsModalOpen(true);
	  }
	  
	  function closeModal() {
		setIsModalOpen(false);
	  }

	function ItemClick(item){
			// 이미 선택된 항목인지 확인
			const isItemSelected = selectedItems.some((selectedItem) => selectedItem.contentsid === item.contentsid);
		  
			// 이미 선택된 항목이라면 제거, 아니라면 추가
			if (isItemSelected) {
			  setSelectedItems((prevSelectedItems) =>
				prevSelectedItems.filter((selectedItem) => selectedItem.contentsid !== item.contentsid)
			  );
			} else {
				if (selectedItems.length < 5){
					const newItem = { ...item, order: selectedItems.length + 1 };
					setSelectedItems((prevSelectedItems) => [...prevSelectedItems, newItem]);

				}
			}
		}
		  


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
		setLoading(false);
	}

	useEffect(() => {
		getData();
	}, [])

	if (loading) {
		return <div>로딩 중...</div>;
	}


	return (
		<>
			<div className={style.mid_title}>
				<p>내가 만든 여행코스로 더욱 즐겁게 여행해요!</p>
				<a></a>
			</div>

			<div className={style.whole}>
				<div>
					<div className={style.label}>
						
							<img src="/asset/common/home.svg"/>
						
						<p>숙소 중 한곳을 선택해주세요</p>
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
							<SwiperSlide className={`${style.api_pic_whole} 
							${selectedItems.some((selectedItem) => selectedItem.contentsid === item.contentsid) ? style.selectedItem : ''}`}
							key={item.contentsid}>
								
								<a className={style.api_pic_list} onClick={() => ItemClick(item)}>
									<div className={style.api_explain}>
										<p className={style.api_explain_order}>{item.order}</p>
										<div className={style.api_explain_title}>
											{item.title}
										</div>
										<img className={style.api_explain_heart} src="../asset/common/icon_favorite_full.svg">{/* 하트, 클릭 이벤트 데이터 저장 */}</img>
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
						<img src="/asset/common/meal.svg"/>
						<p>가고 싶은 맛집을 두 곳을 선택해 주세요</p>
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
							<SwiperSlide className={`${style.api_pic_whole} 
							${selectedItems.some((selectedItem) => selectedItem.contentsid === item.contentsid) ? style.selectedItem : ''}`} 
							key={item.contentsid}>
								
								<a className={style.api_pic_list} onClick={() => ItemClick(item)}>
									<div className={style.api_explain}>
										<p className={style.api_explain_title}>{item.title}</p>
										<img className={style.api_explain_heart} src="../asset/common/icon_favorite_full.svg">{/* 하트, 클릭 이벤트 데이터 저장 */}</img>
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
						<img src="/asset/common/place.svg"/>
						<p>가고 싶은 명소를 두곳 선택해주세요</p>
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
							<SwiperSlide className={`${style.api_pic_whole} 
							${selectedItems.some((selectedItem) => selectedItem.contentsid === item.contentsid) ? style.selectedItem : ''}`} 
							key={item.contentsid}>

								<a className={style.api_pic_list} onClick={() => ItemClick(item)}>
									<div className={style.api_explain}>
										<p className={style.api_explain_title}>{item.title}</p>
										<img className={style.api_explain_heart} src="../asset/common/icon_favorite_full.svg">{/* 하트, 클릭 이벤트 데이터 저장 */}</img>
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
				<div className={style.course_navi}>
					<button className={style.course_btn}
					onClick={() => {
						setModalTitle('');
						setSelectedItemContent(selectedItems.map(item => item.title).join(', ')); openModal();}}>
						<p>코스만들기</p>
					</button>
				</div>
				{isModalOpen && (
					<div className={style.modal}>
						<div className={style.modal_content}>
							<div className={style.modal_title}>
								<h2>코스 이름을 입력해 주세요!</h2>
								<button onClick={closeModal}>x</button>
							</div>
							<input
							 type="text"
							 placeholder="제목을 입력하세요"
							 className={style.search}
							>
							
							</input>
							<p>
								{selectedItems.map((item, index) => (
									<React.Fragment key={item.contentsid}>
										<div className={style.modal_itemlist}>
											{item.title}
											{index !== selectedItems.length - 1 && <br />} {/* 마지막 항목이 아닌 경우에만 줄 바꿈 추가 */}
										</div>
									</React.Fragment>
								))}
							</p>

							<button onClick={()=>{}}>코스저장</button>
						</div>
					</div>
				)}



		</>
	)
}

export default page