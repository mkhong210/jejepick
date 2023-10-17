"use client"
import React, { useEffect, useState } from "react";
import style from "./best.module.scss";
import List from "@/app/components/list/List";
import axios from "axios";
import { useRouter } from "next/navigation";

function page() {

  const router = useRouter();
    const listmove = (e) => {
        router.push("/pages/list");
    }

  const [aaa,setAaa] = useState(null);
  const loginID = window.localStorage.getItem('loginId');
  useEffect(() => {
    if (loginID) {
      axios.get(`/server_api/ja?id=${loginID}`)
      .then((response)=>{setAaa(response.data);})
      .catch((error)=>{console.log('Error:'.error)});
      // console.log('사용자 아이디:', loginID);
    }
  }, [loginID]);

  let bbb = null;
  
  if (aaa && aaa.length > 0) {
    bbb = aaa[0].name;
    console.log(bbb);
  }

  return (
    <>
     <div className={style.best}>
      <div className={style.contents_bestlist_back}>
        <div className={style.contents_profile + ` inner`}>
          <div className={style.contents_profile_img}>
            <div>
              <img src="/asset/image/test/TEST_character2.png" />
            </div>
          </div>
          <ul className={style.contents_profile_txt}>
            <li>
              <p>'계획대로 되고있어' 천혜향</p>
            </li>
            <li>
              <b>{bbb}</b>
            </li>
            <li>
              <span>계획적</span>
              <span>활동적</span>
              <span>열정</span>
            </li>
          </ul>
        </div>
        <div className={style.contents_bestlist_txt + ` inner`}>
          <div>
            <p>제제픽의 맞춤 여행지!</p>
            <p>이런 여행지는 어떠신가요?</p>
          </div>
          <p onClick={listmove}>더보기</p>
        </div>
      </div>
          
      <div className={style.contents_bestlist_back2}>
        <div className={style.contents_bestlist + ` inner`}>
        <div className={style.list}>
          <div className={style.listcon}>
            <h2><img src="/asset/image/bestlist/marker1.svg"/>숙소 추천</h2>
          </div>
          <List/>
        </div>

        <div className={style.list}>
          <div className={style.listcon}>
            <h2><img src="/asset/image/bestlist/marker2.svg"/>맛집 추천</h2>
          </div>
          <List/>
        </div>

        <div className={style.list}>
          <div className={style.listcon}>
            <h2><img src="/asset/image/bestlist/marker3.svg"/>명소 추천</h2>
          </div>
          <List/>
        </div>

        </div>
      </div>
    </div>
    </>
  );
}

export default page;