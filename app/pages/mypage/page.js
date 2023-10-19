"use client"
import React, { useContext, useEffect, useState } from 'react'
import style from './mypage.module.scss'
import { MyContext } from '@/app/components/Context';
import axios from 'axios';
import { useRouter } from 'next/navigation';

function page() {
	const {status, headStatus, setHeadStatus, btmStatus,setBtmStatus} = useContext(MyContext);
	const [data, setData] = useState([]);
	const router = useRouter();

	//로컬아이디
	const loginID = window.localStorage.getItem('loginId');
	//성향,이름 데이터
	const [aaa, setAaa] = useState({ data1: null, data2: null });

	// console.log(aaa);
	
	useEffect(() => {
		setHeadStatus(true);
		setBtmStatus(false);
		status();
		// const header = document.getElementsByClassName('hidden');
		// const status = header[0];
		// if(status){
		// 	console.log(main)
		// 	main.classList.remove('no')
		// 	main.classList.add('on')
		// } else {
		// 	main.classList.remove('on')
		// 	main.classList.add('no')
		// }

	}, []);

	const logOut = ()=>{
		localStorage.removeItem('loginId');
		router.push("/pages/login");
	}

	const moveResult = ()=>{
		router.push("/pages/personal-result");
	}

	const moveTest = ()=>{
		router.push("/pages/personal-start");
	}

	console.log(data);
  
	// 첫 번째 요청 (로그인내용)
	useEffect(() => {
	  if (loginID) {
		axios.get(`/server_api/ja?id=${loginID}`)
		.then((response) => {
			setAaa((prevData) => ({
			  ...prevData,
			  data1: response.data,
			}));
		  })
		  .catch((error) => {
			console.log('Error:', error);
		  });
		}
	  }, [loginID]);
  
	// 두 번째 요청(성향테스트결과)
	useEffect(() => {
	  if (loginID) {
		axios.get(`/server_api/jaresult?profile=${loginID}`)
		.then((response) => {
			setAaa((prevData) => ({
			  ...prevData,
			  data2: response.data,
			}));
		})
		  .catch((error) => {
			console.log('Error:', error);
		  });
		}
	  }, [loginID]);
	  
	  let myName = null;
	  let tendency = null;
	  let image = null;
	  let tags = null;
	  
	  if (aaa.data1 && aaa.data1.length > 0) {
		myName = aaa.data1[0].name;
	  }
	  
	  if (aaa.data2 && aaa.data2.length > 0) {
		const parsedProfileData = JSON.parse(aaa.data2[0].contents);
		tendency = parsedProfileData.tendency;
		image = parsedProfileData.image;
		
  
		if (Array.isArray(parsedProfileData.tag)) {
		  tags = parsedProfileData.tag.map(tag => tag.trim());
		} else if (typeof parsedProfileData.tag === 'string') {
		  tags = parsedProfileData.tag.split(',').map(tag => tag.trim());
		} else {
		  console.error('Unexpected format for tags:', parsedProfileData.tag);
		}
		
		
	  }

	return (
		<>
			<div className={style.profile +` inner`}>
				<div className={style.proback}></div>
				<div className={style.mytop}>
					<div>마이페이지</div>
				</div>
				<div className={style.procon}>
					<div className={style.procontop}>
						<div className={style.myprofileimg}>
							<img src={image} />
						</div>
						<div>
							<p>{tendency}</p>
							<h3>{myName}</h3>
						</div>
					</div>
					<div className={style.proconbottom}>
						{tags && tags[0] && <span>{tags[0]}</span>}
						{tags && tags[1] && <span>{tags[1]}</span>}
						{tags && tags[2] && <span>{tags[2]}</span>}
					</div>
				</div>
			</div>
			<div className={style.prolist +` inner`}>
				<div className={style.mypagecon1}>
					<div className={style.myevent}>
						<div onClick={moveTest} className={style.recom}>
							<h4>추천 여행지가 아쉬우신가요?</h4>
							<p>테스트 다시하기</p>
						</div>
						<div className={style.jejeimg}></div>
					</div>
					<div className={style.myevent}>
						<div onClick={moveResult} className={style.recom}>
							<h4>제제픽이 말아주는 나의 여행성향은?</h4>
							<p>성향 결과 보기</p>
						</div>
						<div className={style.jejeimg}></div>
					</div>
				</div>
				<div className={style.mycontopnav}>
					<h2>나의 찜 목록</h2>
					<p>더보기</p>
				</div>
				<div className={style.mypagecon2}>
					<div className={style.heartlistnone}>찜하러 가기</div>
				</div>
				<div className={style.mycontopnav}>
					<h2>나의 여행코스</h2>
					<p>더보기</p>
				</div>
				<div className={style.mypagecon3}>
					<div className={style.corselistnone}>
						추가+
					</div>
					{/* <div className={style.corselist}>
						<div className={style.corsename}>뚜벅이 1일차 제주도 코스</div>
						<div className={style.corsedel}>삭제</div>
					</div> */}
				</div>
			</div>
			<div onClick={logOut} className={style.logout}>로그아웃</div>
		</>
	)
}

export default page