"use client";
import React, { useEffect, useState } from 'react'
import style from '../../pages/course-list/courseList.module.scss'
import CouseItem from './CouseItem'
import axios from 'axios';

function CourseList() {
	
	const [data, setData] = useState([]);
	const loginID = window.localStorage.getItem('loginId');
	async function getCourse() {
		
		const result = await axios.get(`/server_api/course?profile=${loginID}`)
		.then(res=>{
			setData(res.data)})
	}

	useEffect(()=>{
		getCourse();
	},[])

	return (
		<>
			<ul className={style.list_wrap}>
			{
					data.map((item,k)=>(

					<li key={k}>
						
							<CouseItem item={item} setData={setData} />
						
						
					</li>
					))
				}			
			</ul>
			
				<button className={style.course_btn}>
					<p>코스 다시 만들기</p>
				</button>
			
		</>
	)
}

export default CourseList