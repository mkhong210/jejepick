"use client"
import React, { useContext, useEffect, useState } from "react";
import style from "../pages/best-list/best.module.scss";
import List from "@/app/components/list/List";
import axios from "axios";
import { useRouter } from "next/navigation";
import { MyContext } from "./Context";

export default function BestList () {

    
  const router = useRouter();
    const listmove = (e) => {
        router.push("/pages/list");
    }

  const loginID = window.localStorage.getItem('loginId');
  const [aaa, setAaa] = useState({ data1: null, data2: null });

  const {testResultValue} = useContext(MyContext);
  console.log(testResultValue );
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
  let bestlist = null;

  if (aaa.data1 && aaa.data1.length > 0) {
    myName = aaa.data1[0].name;
    console.log(myName);
  }

  if (aaa.data2 && aaa.data2.length > 0) {
    const parsedProfileData = JSON.parse(aaa.data2[0].contents);
    bestlist= aaa.data2[0].keywords;
    tendency = parsedProfileData.tendency;
    image = parsedProfileData.image;

    console.log(bestlist);

    if (Array.isArray(parsedProfileData.tag)) {
        tags = parsedProfileData.tag.map(tag => tag.trim());
      } else if (typeof parsedProfileData.tag === 'string') {
        tags = parsedProfileData.tag.split(',').map(tag => tag.trim());
      } else {
        console.error('Unexpected format for tags:', parsedProfileData.tag);
      }

    console.log(tags[0]);
  }

  

  return (
    <>
	  <div className={style.best}>
      <div className={style.contents_bestlist_back}>
        <div className={style.contents_profile + ` inner`}>
          <div className={style.contents_profile_img}>
            <div>
              <img src={image} />
            </div>
          </div>
          <ul className={style.contents_profile_txt}>
            <li>
              <p>{tendency}</p>
            </li>
            <li>
              <b>{myName}</b>
            </li>
            <li>
                {tags && tags[0] && <span>{tags[0]}</span>}
                {tags && tags[1] && <span>{tags[1]}</span>}
                {tags && tags[2] && <span>{tags[2]}</span>}
            </li>
          </ul>
        </div>
        <div className={style.contents_bestlist_txt + ` inner`}>
          <div>
            <p>제제픽의 맞춤 여행지!</p>
            <p>이런 여행지는 어떠신가요?</p>
          </div>
          <p onClick={listmove}>전체보기 
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="8" viewBox="0 0 26 8" fill="none">
              <path d="M1 6.5H23.7701C24.7016 6.5 25.1271 5.33835 24.416 4.73661L20 1" stroke="#FFA366" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </p>
        </div>
      </div>
          
      <div className={style.contents_bestlist_back2}>
        <div className={style.contents_bestlist + ` inner`}>
        <div className={style.list}>
          <div className={style.listcon}>
            <h2><img src="/asset/image/bestlist/marker1.svg"/>숙소 추천</h2>
          </div>
          <List bestlist={bestlist}/>
        </div>

        <div className={style.list}>
          <div className={style.listcon}>
            <h2><img src="/asset/image/bestlist/marker2.svg"/>맛집 추천</h2>
          </div>
          <List bestlist={bestlist}/>
        </div>

        <div className={style.list}>
          <div className={style.listcon}>
            <h2><img src="/asset/image/bestlist/marker3.svg"/>명소 추천</h2>
          </div>
          <List bestlist={bestlist}/>
        </div>

        </div>
      </div>
    </div>
    </>
  );
}

