"use client"
import React, { useEffect } from 'react'
import style from './personalTest.module.scss'
import Test from '@/app/components/Test'

function page() {
	useEffect(() => {
		const head = document.getElementsByClassName(`header`);
		head[0].classList.add(style.hidden);
		const btm = document.getElementsByClassName(`bottom`);
		btm[0].classList.add(style.hidden);
	}, []);
	
	return (
		<>
			<Test />
		</>
	)
}

export default page