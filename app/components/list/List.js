import React, { useState, useEffect } from 'react';
import style from '../../pages/list/list.module.scss'
import ListItem from './ListItem'
import Link from 'next/link'
import Heart from '../Heart';

function List({bestlist,data}) {

let [ddd,setDdd] = useState([]);
	
	if (!bestlist || !data) {
		return <div>Loading...</div>;
	}
	
	// console.log(bestlist);
	console.log(data);

	function filter(e) {
		
		let filteredData = data ? data.filter(obj => obj.alltag && obj.alltag.includes(bestlist[0]) && obj.alltag.includes(bestlist[1])) : [];
		// console.log(filteredData);
		setDdd(filteredData)
	}
	useEffect(()=>{
		filter();
	},[])

	// 무작위로 3개의 요소 선택
	function getRandomItems(arr, numItems) {
		const shuffled = arr.sort(() => 0.5 - Math.random());
		return shuffled.slice(0, numItems);
	}
	
	const randomItems = getRandomItems(ddd, 3);
	



	
	// function filter(e) {
		
	// 	let filteredData = data ? data.filter(obj => obj.alltag && obj.alltag.includes('휴식') && obj.alltag.includes('편의점') && obj.contentscd.label.includes('숙박')) : [];
	// 	// console.log(filteredData);
	// 	setData(filteredData)
	// }
	// useEffect(()=>{
	// 	filter();
	// },[])

	return (
		<>
			<ul className={style.list}>
				{randomItems.map((item, k) => (
					<li className={style.list_item} key={k}>
						<Link href='#' className='item_wrap'>
							<div className='img_wrap'>
								<img src={item.repPhoto.photoid.imgpath}></img>
							</div>
							<div className='text_wrap'>
								<p>{item.title}</p>
								<Heart/>
							</div>
						</Link>
					</li>
				))}
			</ul>
		</>
	)
}

export default List