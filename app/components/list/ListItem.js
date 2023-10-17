"use client"
import React, { useState } from 'react'
// import style from './listitem.module.scss'
import  './listitem.scss'
import Link from 'next/link'

function ListItem({data}) {
	// const name = data.filter(item => item.title == data.title);
	// console.log(name);
	console.log(data);
	const [imageSrc, setImageSrc] = useState("/asset/common/Icon_favorite.svg");
	const [isClicked, setIsClicked] = useState(false);

	const handleClick = () => {
		if (isClicked) {
			setImageSrc("/asset/common/Icon_favorite.svg");
				setIsClicked(false); // 초기 상태 false 일 땐 초기 상태 이미지 src
			} else {
				setImageSrc("/asset/common/Icon_favorite_full.svg");
				setIsClicked(true); // true일 땐 변경될 이미지 src
			}
	};

	return (
		<>
				{/* <p>{data['title']}</p> */}
			<Link href='#' className='item_wrap'>
				<div className='img_wrap'>
					{/* <img src={data.repPhoto[thumbnailpath]} alt={data.title} /> */}
					<img src='/asset/common/item_example_thum.jpg'></img>
				</div>
				<div className='text_wrap'>
					{/* <p>{data.title}</p> */}
					<p>똘똘이 국밥집</p>
					<button className='like' onClick={handleClick}>
						<img src={imageSrc} />
					</button>
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