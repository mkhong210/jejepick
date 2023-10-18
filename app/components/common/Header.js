"use client";
import React, { useContext, useEffect } from 'react'
import { MyContext } from '../Context'
import style from './common.module.scss'
import Link from 'next/link';
// import commonstatus from './commonstatus';

function Header() {
	const {headStatus, setHeadStatus} = useContext(MyContext);
	useEffect(() => {
		setHeadStatus(true);
	}, []);
	// commonstatus();

	return (
		<header className={`${style.header} ${headStatus ? 'hidden':''}`+ ` header`}>
			{/* <div>Header</div> */}
			<Link href='/pages/main'>
			<img src='/asset/common/logo.svg' alt='제제픽 로고' />
			</Link>
		</header>
	)
}

export default Header