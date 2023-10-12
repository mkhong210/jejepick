import React from 'react'
import style from './common.module.scss'

function Header() {
	return (
		<header className={style.header}>
			{/* <div>Header</div> */}
			<p><img src='/asset/common/logo.svg' alt='제제픽 로고' /></p>
		</header>
	)
}

export default Header