"use client"
import React, { useEffect, useState } from 'react'
import style from '../../pages/list/list.module.scss'
import List from '@/app/components/list/List';
import ListItem from './ListItem';
import axios from 'axios';
import Loading from '../loading/Loading';

function TotalList({ tabTxt, totalData, searchedData}) {
	// console.log(tabTxt);
	// 데이터 불러오기
	
	const [data, setData] = useState([]); // 숙박/숙소
	const [data2, setData2] = useState([]); // 음식점/맛집
	const [data3, setData3] = useState([]); // 관광지/관광
	const [loading, setLoading] = useState(true);
	const [newData, setNewData] = useState([]);
	



	const filterData = () => {
		const filteredData1 = newData.filter(item => item.contentscd.label === '숙박');
		const filteredData2 = newData.filter(item => item.contentscd.label === '음식점');
		const filteredData3 = newData.filter(item => item.contentscd.label === '관광지');
		setData(filteredData1); // 숙박/숙소 데이터 저장
		setData2(filteredData2); // 음식점/맛집 데이터 저장
		setData3(filteredData3); // 관광지/관광 데이터 저장
		setLoading(false);
	};
	
	const height = () => {
		const totalItems = document.getElementsByClassName(`${style.total_item}`);

		for (let i = 0; i < totalItems.length; i++) {
			const item = totalItems[i];
			const children = item.children;
			if (children.length > 0) {
				children[0].classList.add('active');
			}
		}
	}
	
	useEffect(() => {
		setNewData(totalData)
		height();
		if(newData.length){
			filterData(newData);
		}
	}, [totalData])

	useEffect(() => {
		if(newData.length){
			filterData(newData);			
		}
		height();		
	}, [newData])

	
	if (loading) {
		return <div><Loading /></div>;
	}
	return (
		<>
			<ul className={style.total_list}>
				{
					tabTxt === "숙소"
						? data.map((item, k) => (
							<li className={style.total_item} key={k}>
								<ListItem data={item} searchedData={searchedData}/>
							</li>
						))
						: (tabTxt === "맛집"
							? data2.map((item, k) => (
								<li className={style.total_item} key={k}>
									<ListItem data={item} searchedData={searchedData}/>
								</li>
							))
							: data3.map((item, k) => (
								<li className={style.total_item} key={k}>
									<ListItem data={item} searchedData={searchedData}/>
								</li>
							))
						)
				}
				
			</ul>

			
		</>
	)
}

export default TotalList