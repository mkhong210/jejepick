"use client";
import axios from 'axios';
import React, { useEffect, useState } from 'react'
// import style from '../pages/favorite/favorite.module.scss'
import './list/listitem.scss'

function Heart({dataId}) {
	const [select, setSelct] = useState([]);
	const [itemId, setItemId] = useState();
	const loginID = window.localStorage.getItem('loginId'); 
	const [imageSrc, setImageSrc] = useState("/asset/common/Icon_favorite.svg");
	const [isSelected,setIsSelected] =useState(false);


	useEffect(() => {
		setItemId(dataId);
	}, [dataId])

	/* const isSelected = (itemId) => {
		return select.includes(itemId);
	} */

	useEffect(()=>{
		const imageChange=async()=>{
			const  response =await axios.get(`/server_api/item?profile=${loginID}`)
			if(response.data&&response.data.length>0){
				setImageSrc("/asset/common/Icon_favorite_full.svg");
				setIsSelected(true);
			}
		}
		imageChange();
	},[loginID])

	const heartclick = (e) => {
		e.preventDefault();
		const loginID = window.localStorage.getItem('loginId');
		if (loginID) {
			if (!isSelected) {
				axios.post(`/server_api/item`, { profile: loginID, contentsid: itemId })
					.then((response) => {
						setSelct([...select, itemId]);
						setIsSelected(true);
						alert("찜목록에 추가되었습니다.");
						setImageSrc("/asset/common/Icon_favorite_full.svg");
					})
					.catch((error) => { console.log('Error:'.error) });
			}
			else {
				axios.delete(`/server_api/item`, { data: { profile: loginID, contentsid: itemId } })
					.then((response) => {
						setSelct(select.filter((item) => item !== itemId));
						setIsSelected(false);
						alert("찜목록에서 제거되었습니다.")
						setImageSrc("/asset/common/Icon_favorite.svg");
					})
					.catch((error) => { console.log('Error:'.error) });
			}
			
		}
	}

	return (
		<>
			<button className='like' onClick={heartclick}>
				<img 
					src={imageSrc}
				>
				</img>
			</button>
		</>
	)
}

export default Heart