"use client"

import { useContext, useEffect, useState } from "react";
import resultdb from "../../testdb/result.json"
import style from '../pages/personal-result/result.module.scss'
import { MyContext } from "./Context";

export default function Result({selectedOptions}) {
  
  const [jsondata, setJsondata] = useState(resultdb);
  const [num, setNum] = useState(0);
  const {testResultValue} = useContext(MyContext);

  //키워드 2개 필터링
  function filter(e) {
    e.preventDefault();
    
    let filteredData = data ? data.filter(obj => obj.alltag && obj.alltag.includes('잡화') && obj.alltag.includes('제주시내')) : [];
    console.log(filteredData);
    setData(filteredData)
  }

  const keywords1 = ["체험", "바다"]
  const keywords2 = ["체험", "바다X"]
  const keywords3 = ["힐링", "바다"]
  const keywords4 = ["힐링", "바다X"]
  const keywords5 = ["오름", "바다"]
  const keywords6 = ["오름", "바다X"]
  const keywords7 = ["문화유적지", "바다"]
  const keywords8 = ["문화유적지", "바다X"]

  const include1 = keywords1.every(keyword => testResultValue.includes(keyword));
  const include2 = keywords2.every(keyword => testResultValue.includes(keyword));
  const include3 = keywords3.every(keyword => testResultValue.includes(keyword));
  const include4 = keywords4.every(keyword => testResultValue.includes(keyword));
  const include5 = keywords5.every(keyword => testResultValue.includes(keyword));
  const include6 = keywords6.every(keyword => testResultValue.includes(keyword));
  const include7 = keywords7.every(keyword => testResultValue.includes(keyword));
  const include8 = keywords8.every(keyword => testResultValue.includes(keyword));

  useEffect (()=>{
    if (include1) {
      setNum(0)
    } else if(include2) {
      setNum(1)
    }else if(include3) {
      setNum(2)
    }else if(include4) {
      setNum(3)
    }else if(include5) {
      setNum(4)
    }else if(include6) {
      setNum(5)
    }else if(include7) {
      setNum(6)
    }else if(include8) {
      setNum(7)
    }
},[])

  console.log(testResultValue);
  
  return (
    <>
      <div className={style.testbefore}>
				<div className={style.testbeforeback}></div>
				<div className={style.test + ` inner`}></div>
				<div className={style.result}>
					<div className={style.resulttop}>
						<div>퉁퉁이님의 여행타입은?</div>
						<div className={style.resultprofile}>
							<div className={style.propen}>{jsondata[num].tendency}</div>
							<div className={style.resultimg}>
								<img src={jsondata[num].image}></img>
							</div>
							<div className={style.tag}>
								{
                  jsondata[num].tag.map((v,k)=>(
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
                  jsondata[num].contents.map((v,k)=>(
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
									<h4>{jsondata[num].types[0]}</h4>
									<img src={jsondata[num].types_img[0]}></img>
								</div>
								<div className={style.worstmate}>
									<p>나와 안맞는 유형</p>
									<h4>{jsondata[num].types[1]}</h4>
									<img src={jsondata[num].types_img[1]}></img>
								</div>
							</div>
						</div>
						<div className={style.listmove}>맞춤 여행지 보러가기</div>
					</div>
				</div>
			</div>
    </>
  )
}