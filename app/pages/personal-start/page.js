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
        <div className={style.start}>테스트 시작하기</div>
      </div>
    </>
  )
}

export default page