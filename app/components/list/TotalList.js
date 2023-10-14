"use client"
import React, { useEffect, useRef } from 'react'
import style from '../../pages/list/list.module.scss'
import List from '@/app/components/list/List';
import ListItem from './ListItem';

function TotalList() {
  const k = useRef([]);
  useEffect(()=>{
		// console.log(e)
    // const v = k.current.childNodes[0];
    // v.childNodes[0].classList.add('active')
  },[])
  return (
    <>
			<ul className={`inner `+style.total_list}>
				<li className={style.total_item}>
				{/* <li className={style.total_item} ref={e=>{k.current.childNodes[0]=e}}> */}
					<ListItem />
					{/* <ListItem className={style.item} /> */}
				</li>
				<li className={style.total_item} ref={k}>
					<ListItem />
				</li>
				<li className={style.total_item}>
					<ListItem />
				</li>
			</ul>
		</>
  )
}

export default TotalList