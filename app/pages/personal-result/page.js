import React from 'react'
import style from './personalResult.module.scss'

function page() {
	return (
		<>
			<div className={style.testbefore}>
				<div className={style.testbeforeback}></div>
				<div className={style.testbottom}></div>
				<div className={style.test + ` inner`}></div>
				<div className={style.loding}>
					<div className={style.lodingjeje}></div>
					<div className={style.lodingimg}></div>
					<div className={style.lodingcon}>
					퉁퉁이님의 성향에 맞는<br/>제주도의 제일 좋은 여행지를<br/>찾고 있어요!
					</div>
				</div>
			</div>
		</>
	)
}

export default page