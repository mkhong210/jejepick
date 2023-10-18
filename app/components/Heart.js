"use client";
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import style from '../pages/favorite/favorite.module.scss'
function Heart(itemId) {

    const [select,setSelct]=useState([]);
    const [aaaa,setAaaa] = useState(null);
    const [v,setV]=useState();
    useEffect(()=>{
        setV(itemId);

    },[itemId])
    
    const isSelected = (itemId) => {
		return select.includes(itemId);
	  }
	const heartclick = (itemId)=>{
		const loginID = window.localStorage.getItem('loginId'); 
		if(loginID){
			if(!isSelected(v)){
				axios.post(`/server_api/item`,{profile:loginID,contentsid:v})
				.then((response)=>{
					alert("찜목록에 추가되었습니다.");
					setAaaa(response.data);
					setSelct([...select, v]);
				})
				.catch((error)=>{console.log('Error:'.error)});
			}
			else{
				axios.delete(`/server_api/item`,{data:{profile:loginID, contentsid:v}})
				
				.then((response)=>{
					alert("찜목록에서 제거되었습니다.")
					setAaaa(response.data);
					setSelct(select.filter((item) => item !== v));
				})
				.catch((error)=>{console.log('Error:'.error)});
			}
		}
	}

  return (
    <>
        <img className={style.api_explain_heart} 
            src="../asset/common/icon_favorite_full.svg"
            onClick={()=>{
                if(v){
                    heartclick(v)
                }
            }} 
        >

        </img>
        
    </>
  )
}

export default Heart