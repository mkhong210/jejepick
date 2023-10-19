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

  //api 데이터
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  
  async function getData() {
      const result = await axios.get('/api/visit2');
      const newData = result.data;
      setData(newData);
      setLoading(false);
  }
  
  useEffect(() => {
    getData();
  }, [])
  
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
    }
    
    if (aaa.data2 && aaa.data2.length > 0) {
      const parsedProfileData = JSON.parse(aaa.data2[0].contents);
      bestlist = JSON.parse(aaa.data2[0].keywords);
      tendency = parsedProfileData.tendency;
      image = parsedProfileData.image;
      
      //빈배열바꾸기
      for (let i = 0; i < bestlist.length; i++) {
        if (bestlist[i].includes("X")) {
          bestlist[i] = "";
        }
      }
      // console.log(bestlist);

      if (Array.isArray(parsedProfileData.tag)) {
        tags = parsedProfileData.tag.map(tag => tag.trim());
      } else if (typeof parsedProfileData.tag === 'string') {
        tags = parsedProfileData.tag.split(',').map(tag => tag.trim());
      } else {
        console.error('Unexpected format for tags:', parsedProfileData.tag);
      }
      
      
    }

    if (loading) {
        return <div>로딩 중...</div>;
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
              <img src="/asset/common/back_btn.svg"/>
          </p>
        </div>
      </div>
          
      <div className={style.contents_bestlist_back2}>
        <div className={style.contents_bestlist + ` inner`}>
        <div className={style.list}>
          <div className={style.listcon}>
            <h2><img src="/asset/image/bestlist/marker1.svg"/>숙소 추천</h2>
          </div>
          <List bestlist={[bestlist[2],bestlist[3]]} data={data[0]} />
        </div>

        <div className={style.list}>
          <div className={style.listcon}>
            <h2><img src="/asset/image/bestlist/marker2.svg"/>맛집 추천</h2>
          </div>
          <List bestlist={[bestlist[0],bestlist[1]]} data={data[1]} />
        </div>

        <div className={style.list}>
          <div className={style.listcon}>
            <h2><img src="/asset/image/bestlist/marker3.svg"/>명소 추천</h2>
          </div>
          <List bestlist={[bestlist[0],bestlist[4]]} data={data[2]}/>
        </div>

        </div>
      </div>
    </div>
    </>
  );
}

