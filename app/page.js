"use client"
import Image from 'next/image'
import style from './page.module.scss'
import Link from 'next/link'
import { useEffect } from 'react';

export default function Home() {
	useEffect(() => {
		const head = document.getElementsByClassName(`header`);
		head[0].classList.add(style.hidden);
		// const btm = document.getElementsByClassName(`bottom`);
		// btm[0].classList.add(style.hidden);
	}, []);

	return (
		<>
			<h1>splash 페이지</h1>
		</>
	)
}
