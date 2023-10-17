"use client"
import React, { useEffect, useState } from 'react'
import style from '../../pages/list/list.module.scss'
import List from '@/app/components/list/List';
import ListItem from './ListItem';
import axios from 'axios';

function TotalList({ tabTxt }) {
	console.log(tabTxt);
	// 데이터 불러오기
	const [data, setData] = useState(); // 숙박/숙소
	const [data2, setData2] = useState(); // 음식점/맛집
	const [data3, setData3] = useState(); // 관광지/관광
	const [loading, setLoading] = useState(true);

	const filterData = (data) => {
		const filteredData1 = data.filter(item => item.contentscd.label === '숙박');
		const filteredData2 = data.filter(item => item.contentscd.label === '음식점');
		const filteredData3 = data.filter(item => item.contentscd.label === '관광지');

		setData(filteredData1); // 숙박/숙소 데이터 저장
		setData2(filteredData2); // 음식점/맛집 데이터 저장
		setData3(filteredData3); // 관광지/관광 데이터 저장
	};

	async function getData() {
		const result = await axios.get('/api/visit');
		const newData = result.data
		filterData(newData);
		// setData(newData);
		setLoading(false);
	}

	// switch (tabTxt) {
	// 	case "숙박":
	// 		// select = "";
	// 		console.log("숙");
	// 		break;
	// 	case "맛집":
	// 		// select = "/com";
	// 		console.log("맛");
	// 		break;
	// 	case "관광":
	// 		// select = "/com";
	// 		console.log("관");
	// 		break;
	// }

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
		getData();
		height();
		// tabText = "숙소"
	}, [])
	

	// useEffect(() => {
	// 	getData();
	// },[getData])

	if (loading) {
		return <div>로딩 중...</div>;
	}
	return (
		<>
			<ul className={style.total_list}>
				{
					tabTxt === "숙소"
						? data.map((item, k) => (
							<li className={style.total_item} key={k}>
								<p>{item.title}</p>
								{/* <img src={item.repPhoto.photoid.thumbnailpath}></img> */}
								<ListItem data={item} />
							</li>
						))
						: (tabTxt === "맛집"
							? data2.map((v, k) => (
								<p>{data2[k].title}</p>
								// console.log(data2)
							))
							: data3.map((v, k) => (
								<p>{data3[k].title}</p>
								// console.log(data3)
							))
						)
				}
				{/* <li className={style.total_item}>
					<ListItem />
				</li>
				<li className={style.total_item}>
					<ListItem />
				</li>
				<li className={style.total_item}>
					<ListItem />
				</li> */}
			</ul>
		</>
	)
}

export default TotalList