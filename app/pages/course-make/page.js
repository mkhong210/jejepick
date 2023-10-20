"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import React from 'react'
import style from './courseMake.module.scss'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import { FreeMode, Pagination } from 'swiper/modules';
import { useRouter } from "next/navigation";


function page() {
	const [data, setData] = useState(); // 숙박 관련 
	const [data2, setData2] = useState(); // 관광지 관련
	const [data3, setData3] = useState(); // 음식점 관련
	const [loading, setLoading] = useState(true); //api 불러올때
	const [selectedItems, setSelectedItems] = useState([]); // 선택 함수
	const [isModalOpen, setIsModalOpen] = useState(false); // 모달 
	const [selectedItemContent, setSelectedItemContent] = useState(''); //클릭한 아이템 내용들
	const router = useRouter();
	const [modalTitle, setModalTitle] = useState('');
	const [JejuData,setJejuData]=useState([]);
	const [localx,setLocalx] =useState(null);
	
	let loginID;

	if(typeof window !== 'undefined'){
		loginID = localStorage.getItem('loginId')
	}

	function openModal() {
		setIsModalOpen(true);
	  }
	  
	  function closeModal() {
		setIsModalOpen(false);
	  }

	const insertFn = (e) => {
		e.preventDefault();
		const loginID = window.localStorage.getItem('loginId');
		const contentIds = selectedItems.map((item) => item.contentsid);
		const formdata = new FormData(e.target);
		const values = Object.fromEntries(formdata);
	
		// 코스 이름이 비어 있는지 확인
		if (!values.coursename) {
			alert('코스 이름을 입력하세요.');
		} else {
			axios.post(`/server_api/course`, { ...values, profile: loginID, item_id: contentIds })
				.then((response) => {
					console.log(response.data);
					router.push('/pages/course-list');
				})
				.catch((error) => {
					console.error('에러 발생:', error);
				});
		}
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
	/* --비짓제주 api데이터 요청-- */
	useEffect(()=>{
		axios.get('/api/visit')
		.then((response) => {
			// 비짓제주에서 가져온 데이터를 setJejuData에 저장
			setJejuData(response.data);
		})
	},[])

	/* --서버 데이터 요청-- */
	useEffect(()=>{
		axios.get(`/server_api/item?profile=${loginID}`)
		.then((response)=>{setLocalx(response.data);})
		.catch((error)=>{console.log('Error:'.error)});
	},[loginID])

	useEffect(()=>{
		if(JejuData && localx){ //전체데이터와 찜한데이터가 있다면
			const localxContentsIds = localx.map(item => item.contentsid); //찜한데이터에서 contentsid가 있는걸 가져옴
			const filtercontentsid=JejuData.filter((item)=>localxContentsIds.includes(item.contentsid))
			// console.log(worldofwarcraft);
			// filterData(filtercontentsid);
			// setA(filtercontentsid)
			
			filterData(filtercontentsid); 

		}
	},[JejuData,localx])
	/* ------------------------------- */

	const moveList = () => {
		Router.push("/pages/list");
	}
	if (loading) {
		return <div>로딩 중...</div>;
	}


	return (
		<div className={style.main}>
			<div className={style.mid_title}>
				<p>내가 만든 여행코스로 더욱 즐겁게 여행해요!</p>
				<a></a>
			</div>

			<div className={style.whole}>
				<div>
					<div className={style.label}>
						
							<img src="/asset/image/map/ICON_sleep_pin.svg"/>
						
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

							
						{data.length?
						data.map((item) => (
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
						)):
						(
							<p onClick={moveList} className={style.heartlistnone}>찜하러 가기</p>
						)
					}
					</Swiper>

				</div>
			
				<div>
					<div className={style.label}>
						<img src="/asset/image/map/ICON_food_pin.svg"/>
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
						<img src="/asset/image/map/ICON_tour_pin.svg"/>
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
							<form onSubmit={insertFn}>
								<input
								type="text"
								name="coursename"
								placeholder="제목을 입력하세요"
								className={style.search}
								>
								</input>
							
							
							<div className={style.modal_allign}>
								{selectedItems.map((item, index) => (
									
									<React.Fragment key={item.contentsid}>
										<div className={style.modal_itemlist}>
											{item.title}
											{index !== selectedItems.length - 1 && <br />} {/* 마지막 항목이 아닌 경우에만 줄 바꿈 추가 */}
										</div>
									</React.Fragment>
									
								))}
									<button className={style.modal_btn}>
										
										코스 저장
										
									</button>
								
							</div>
							</form>
						</div>
					</div>
				)}



		</div>
	)
}

export default page