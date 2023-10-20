"use client"
import React from 'react'
import style from './courseList.module.scss'
import CourseList from '@/app/components/course/CourseList'
import CourseBtn from '@/app/components/course/CourseBtn'

function page() {
	
	return (
		<div className={style.main}>
			<div className={style.course_list + ` inner`}>
				<h2>내가 만든 제주도 제일 좋은 코스!</h2>
				<CourseList  />
				<CourseBtn route={"/pages/course-make"} />
				{/* <div onClick={moveCourseMake} className={style.course_plus}>
					<p>추가 +</p>
				</div> */}
			</div>
		</div>
	)
}

export default page