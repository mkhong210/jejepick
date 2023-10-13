"use client";
import React, { useContext } from 'react'
import style from './common.module.scss'
import { MyContext } from '../Context'


function Header() {
	const ddd = useContext(MyContext)

	console.log(ddd)
	return (
		<header className={style.header+` header`}>
			{/* <div>Header</div> */}
			<p><img src='/asset/common/logo.svg' alt='제제픽 로고' /></p>
		</header>
	)
}

export default Header