import React from 'react'
import style from './main.module.scss';
import Link from 'next/link';

function page() {
	return (
		<>
			<div className={style.div +` inner`}>JEJEPICK 메인입니당</div>
			<Link href='/'>홈</Link>
		</>
	)
}

export default page