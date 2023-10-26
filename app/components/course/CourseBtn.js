"use client"
import React from 'react'
import { useRouter } from 'next/navigation';
import style from '../../pages/course-list/courseList.module.scss'

function CourseBtn({route}) {
	const router = useRouter();
	const moveCourseMake = () => {
		router.push(`${route}`);
	}
	
	return (
		<button onClick={moveCourseMake} className={style.course_plus}>
			<p>코스 추가 +</p>
		</button>
	)
}

export default CourseBtn