"use client"
import React, { useEffect } from 'react'
import style from './personalStart.module.scss'

function page() {
  useEffect(() => {
		const head = document.getElementsByClassName(`header`);
		head[0].classList.add(style.hidden);
		const btm = document.getElementsByClassName(`bottom`);
		btm[0].classList.add(style.hidden);
	}, []);

  return (
    <>
      <div className={style.testbefore}>
        <div className={style.testbeforeback}></div>
        <div className={style.whiteback}></div>
        <div className={style.startcon}>
          <div className={style.startjeje}></div>
          <div className={style.con}>
            <div><span>나</span>에게 맞는 <span>여행지</span>는 어디일까?</div>
            <p>제제픽에서 성향 테스트 진단 결과로<br/>맞춤 여행지를 추천해드려요!</p>
          </div>
        </div>
        <div className={style.start}>테스트 시작하기</div>
      </div>
    </>
  )
}

export default page