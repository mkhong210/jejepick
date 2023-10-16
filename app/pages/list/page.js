"use client"
import React, { useContext, useEffect, useState } from 'react'
import style from './list.module.scss'
import List from '@/app/components/list/List';
import TotalList from '@/app/components/list/TotalList';
import { MyContext } from '@/app/components/Context';

function Page() {
	const {headStatus, setHeadStatus, btmStatus,setBtmStatus} = useContext(MyContext);
	useEffect(() => {
		setHeadStatus(false);
		setBtmStatus(false);

		const header = document.getElementsByClassName('hidden');
		const status = header[0];
		if(status){
			console.log(main)
			main.classList.remove('no')
			main.classList.add('on')
		} else {
			main.classList.remove('on')
			main.classList.add('no')
		}
	}, []);


	return (
		<>
			<div className={style.list_wrap+ `inner`}>
				<List />
			</div>
			<div className={style.totallist_wrap+ `inner`}>
				<TotalList />
			</div>
		</>
	)
}

export default Page