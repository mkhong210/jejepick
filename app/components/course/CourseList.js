import React from 'react'
import style from '../../pages/course-list/courseList.module.scss'
import CouseItem from './CouseItem'

function CourseList() {
	return (
		<>
			<ul className={style.list_wrap}>
				<li>
					<CouseItem />
				</li>
				<li>
					<CouseItem />
				</li>
				<li>
					<CouseItem />
				</li>
			</ul>
		</>
	)
}

export default CourseList