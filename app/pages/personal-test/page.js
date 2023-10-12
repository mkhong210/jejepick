import React from 'react'
import style from './personalTest.module.scss'

function page() {
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