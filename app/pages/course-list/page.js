import React from 'react'
import style from './courseList.module.scss'
import CourseList from '@/app/components/course/CourseList'

function page() {
	return (
		<>
			<div className={style.course_list +` inner`}>
				<CourseList />
			</div>
		</>
	)
}

export default page