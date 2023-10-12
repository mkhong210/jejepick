import React from 'react'
// import style from './course.module.scss'
import style from '../../pages/course-list/courseList.module.scss'

function CouseItem() {
	return (
		<div className={style.item_wrap}>
			<img src='/asset/image/map/ICON_yellow_pin.svg' alt='yellow pin' />
			<p className={style.txt}></p>
		</div>
	)
}

export default CouseItem