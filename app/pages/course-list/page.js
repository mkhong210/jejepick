import React from 'react'
import style from './courseList.module.scss'
import CourseList from '@/app/components/course/CourseList'

function page() {
	return (
		<>
			<div className={style.course_list +` inner`}>
				<h2>내가 만든 제주도 제일 좋은 코스!</h2>
				<CourseList />
			</div>
		</>
	)
}

export default page