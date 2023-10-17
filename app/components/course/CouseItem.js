import React, { useEffect, useState } from 'react'
// import style from './course.module.scss'
import style from '../../pages/course-list/courseList.module.scss'

	

function CouseItem({item}) {	
	

	
	return (
		<div className={style.item_wrap}>
			<img src='/asset/image/map/ICON_yellow_pin.svg' alt='yellow pin' />
			<p className={style.txt}>{item.coursename}</p>
			<button className={style.del_btn}>삭제</button>
		</div>
	)
}

export default CouseItem