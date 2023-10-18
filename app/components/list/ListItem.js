"use client"
import React, { useEffect, useState } from 'react'
// import style from './listitem.module.scss'
import './listitem.scss'
import Link from 'next/link'
import Heart from '../Heart';

function ListItem({ data }) {
	// const name = data.filter(item => item.title == data.title);
	// console.log(name);
	// console.log(data);
	const [imageSrc, setImageSrc] = useState("/asset/common/Icon_favorite.svg");
	// const [isClicked, setIsClicked] = useState(false);
	const [newData, setNewData] = useState();

	// const handleClick = () => {
	// 	if (isClicked) {
	// 		setImageSrc("/asset/common/Icon_favorite.svg");
	// 		setIsClicked(false); // 초기 상태 false 일 땐 초기 상태 이미지 src
	// 	} else {
	// 		setImageSrc("/asset/common/Icon_favorite_full.svg");
	// 		setIsClicked(true); // true일 땐 변경될 이미지 src
	// 	}
	// };

	useEffect(() => {
		setNewData(data);
	}, [data])

	return (
		<>
			{/* <p>{data['title']}</p> */}
			{/* <Link href={`/pages/list/${data.contentsid}`} className='item_wrap'> */}
			<Link href='#' className='item_wrap'>
				<div className='img_wrap'>
					{/* <img src={data.repPhoto[thumbnailpath]} alt={data.title} /> */}
					{data ? (
						<img src={data?.repPhoto?.photoid?.thumbnailpath} alt={data.title} />
					) : (

						<img src='/asset/common/item_example_thum.jpg' alt='똘똘이 국밥집' />
					)
					}
				</div>
				<div className='text_wrap'>
					{data ? (
						<p>{data.title}</p>
					) : (
						<p>똘똘이 국밥집</p>
					)}
					{data ? (
						<Heart dataId={data.contentsid} />
					) : (
						<button className='like'>
							<img src={imageSrc} />
						</button>
					)}
				</div>
			</Link>
			{/* <div className={style.item_wrap}>
				<div className={style.img_wrap}>
					<img src='/asset/common/item_example_thum.jpg'></img>
				</div>
				<div className={style.text_wrap}>
					<p>똘똘이 국밥집</p>
					<button className={style.like}>
						<img src='/asset/common/Icon_favorite.svg' />
					</button>
				</div>
			</div> */}
		</>
	)
}

export default ListItem