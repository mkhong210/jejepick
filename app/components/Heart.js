"use client";
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
// import style from '../pages/favorite/favorite.module.scss'
import './list/listitem.scss'
import { MyContext } from './Context';

function Heart({dataId}) {
	const [select, setSelct] = useState([]);
	const [itemId, setItemId] = useState();
	const loginID = window.localStorage.getItem('loginId'); 
	const [imageSrc, setImageSrc] = useState("/asset/common/Icon_favorite.svg");
	const [isSelected,setIsSelected] = useState(false);
	const {jim,setJim,isStatus,setIsStatus} = useContext(MyContext);

	useEffect(() => {
		setItemId(dataId);
	}, [dataId])

	/* const isSelected = (itemId) => {
		return select.includes(itemId);
	} */

	useEffect(()=>{
		const imageChange=async()=>{
			const selected = jim.filter(j=>j.contentsid == dataId)
			if(selected.length){
				setIsSelected(true);
				setImageSrc("/asset/common/Icon_favorite_full.svg");
			}else{
				setIsSelected(false);
				setImageSrc("/asset/common/Icon_favorite.svg");
			}
		}
		imageChange();
	},[jim])

	

	const heartclick = (e) => {
		e.preventDefault();
		const loginID = window.localStorage.getItem('loginId');
		
		if (loginID) {
			if (!isSelected) {
				axios.post(`/server_api/item`, { profile: loginID, contentsid: itemId })
					.then((response) => {						
						alert("찜목록에 추가되었습니다.");
						setIsSelected(true);
						setImageSrc("/asset/common/Icon_favorite_full.svg");
					})
					.catch((error) => { console.log('Error:'.error) });
			}
			else {
				axios.delete(`/server_api/item`, { data: { profile: loginID, contentsid: itemId } })
					.then((response) => {
						
						alert("찜목록에서 제거되었습니다.")
						setIsSelected(false);
						setImageSrc("/asset/common/Icon_favorite.svg");
					})
					.catch((error) => { console.log('Error:'.error) });
			}
			
		}
		setIsStatus(!isStatus);
	}

	return (
		<>
			{/* <p>{isSelected?'true':'false'}</p> */}
			<button className='like' onClick={heartclick}>
				<img src={imageSrc} className='like_img'/>
			</button>
		</>
	)
}

export default Heart