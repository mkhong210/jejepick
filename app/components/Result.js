"use client"

import { useContext, useEffect, useState } from "react";
import resultdb from "../../testdb/result.json"
import style from '../pages/personal-result/result.module.scss'
import { MyContext } from "./Context";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Result() {
  
  const router = useRouter();
  const [data, setData] = useState([]);
  const loginID = localStorage.getItem('loginId');
  const [loading, setLoading] = useState(true);

  async function getData() {
    if (loginID) {
      const result = await axios.get(`/server_api/personal_result?profile=${loginID}`)
      const newData = JSON.parse(result.data.contents);
      setData(newData);
      setLoading(false);
    }
  }
  useEffect(() => {
    getData();
  }, [])
  
  const movePage = ()=>{
    router.push('/pages/best-list')
  }
  
  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <>
      <div className={style.testbefore}>
				<div className={style.testbeforeback}></div>
				<div className={style.test + ` inner`}></div>
				<div className={style.result}>
					<div className={style.resulttop}>
						<div>퉁퉁이님의 여행타입은?</div>
						<div className={style.resultprofile}>
							<div className={style.propen}>{data.tendency}</div>
							<div className={style.resultimg}>
								<img src={data.image}></img>
							</div>
							<div className={style.tag}>
								{
                  data.tag.map((v,k)=>(
                    <span key={k}>{v}</span>
                ))
                }
							</div>
						</div>
					</div>
					<div className={style.resultbottom}>
						<div className={style.resultcon}>
							<div className={style.propencon}>
								{
                  data.contents.map((v,k)=>(
                    <div key={k}>
                      <img src='/asset/image/test/resultmarker.svg' />
                      {v}
                    </div>
                ))
                }
							</div>
							<div className={style.mate}>
								<div className={style.bestmate}>
									<p>나와 맞는 유형</p>
									<h4>{data.types[0]}</h4>
									<img src={data.types_img[0]}></img>
								</div>
								<div className={style.worstmate}>
									<p>나와 안맞는 유형</p>
									<h4>{data.types[1]}</h4>
									<img src={data.types_img[1]}></img>
								</div>
							</div>
						</div>
						<div onClick={movePage} className={style.listmove}>맞춤 여행지 보러가기</div>
					</div>
				</div>
			</div>
    </>
  )
}