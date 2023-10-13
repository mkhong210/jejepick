"use client"
import React from 'react'
// import style from './listitem.module.scss'
import  './listitem.scss'

function ListItem() {
	return (
		<>
			<div className='item_wrap'>
				<div className='img_wrap'>
					<img src='/asset/common/item_example_thum.jpg'></img>
				</div>
				<div className='text_wrap'>
					<p>똘똘이 국밥집</p>
					<button className='like'>
						<img src='/asset/common/Icon_favorite.svg' />
					</button>
				</div>
			</div>
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