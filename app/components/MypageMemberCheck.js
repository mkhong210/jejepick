"use client"
import axios from "axios";
import React, { useEffect, useState } from 'react'


function MypageMemberCheck() {
  const [data,setData]=useState([]);
  console.log(data);
  const getData = ()=>{     //데이터를 받아올게
    axios.get('/server_api')       //api 폴더 에서
    .then(res=>{
        setData(res.data);  
    })
  } 
  useEffect(()=>{           //불러온 데이터를 딱 한번만 실행할게
    getData();
  },[])
  return (
    <>
        <div>마이페이지</div>
        <div>
            {
                data.map(obj=>(
                    <div key={obj.num}>
                        <p>프로 귀차니즘 달팽이{obj.id}</p>
                        <p>{obj.name}님</p>
                        <p>{obj.number}</p>
                    </div>
                ))
            }
        </div>
    </>
  )
}

export default MypageMemberCheck