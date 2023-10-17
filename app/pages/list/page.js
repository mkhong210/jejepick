"use client"
import React, { useContext, useEffect, useState } from 'react'
import style from './list.module.scss'
import List from '@/app/components/list/List';
import TotalList from '@/app/components/list/TotalList';
import { MyContext } from '@/app/components/Context';
// import commonstatus from '@/app/components/common/commonstatus';

function Page() {
	const { status, headStatus, setHeadStatus, btmStatus, setBtmStatus } = useContext(MyContext);
	const [tabTxt, setTabTxt] = useState("숙소");
	
	// 검색 창
	function searchBox(e) {
		e.preventDefault();
		let sText = e.target.children[0].value;
		console.log(sText);
		e.target.children[0].value = '';

		const tab = document.getElementById('tabMenu');
		console.log(tab)
		tab.classList.add('hidden')
	}

	// 탭 메뉴
	function tab_click() {
		// const tabItem = document.querySelectorAll('.tab_list .tab_item')
		const tabItem = document.getElementsByClassName(`${style.tab_list}`);
		const tabtab = [...tabItem[0].children];
		const hadActive = document.getElementsByClassName(`${style.active}`);
		
		let num = 0, txt = '';
		tabtab.forEach(function(v,k) {
			v.addEventListener('click', function() {
				tabtab[num].classList.remove(`${style.active}`);
				this.classList.add(`${style.active}`);
				txt = this.children[1].innerText;
				console.log(txt);
				setTabTxt(txt);
				num = k;
			})
		});
	}

	const height = () => {
		const totalItems = document.getElementsByClassName(`${style.list_item}`);
		// console.log(totalItems)
		
		for (let i = 0; i < totalItems.length; i++) {
			const item = totalItems[i];
			const children = item.children;
			
			if (children.length > 0) {
				children[0].classList.add('active')
			}
		}
	}

	useEffect(() => {
		setHeadStatus(false);
		setBtmStatus(false);
		status();
		tab_click();
		// commonstatus();
		height();
		setTabTxt("숙소");
	}, []);
	console.log(tabTxt)

	return (
		<>
			<div className={`inner ` + style.list_contwrap}>
				<h2>내가 만든 제주도 제일 좋은 코스!</h2>
				<form className={style.search_wrap} onSubmit={(e) => { searchBox(e) }}>
					<input type='text' placeholder='검색어를 입력하세요.' className={style.search_box}>
					</input>
					<button className={style.search_btn}>
						<img src='/asset/image/list/ICON_search.svg' />
					</button>
				</form>
				<div className={style.tab_wrap} id='tabMenu'>
					<ul className={style.tab_list}>
						{/* {
							tabList.map((v, k) => (
								<li className={`${style.tab_item} ${style.active}`} onClick={tab_click} key={k}>
									<img src='/asset/image/map/ICON_yellow_pin.svg' />
									<p>{v}</p>
								</li>
							))
						} */}
						
						<li className={`${style.tab_item} ${style.active}`}>
							<img src='/asset/image/map/ICON_yellow_pin.svg' />
							<p>숙소</p>
						</li>
						<li className={style.tab_item}>
							<img src='/asset/image/map/ICON_yellow_pin.svg' />
							<p>맛집</p>
						</li>
						<li className={style.tab_item}>
							<img src='/asset/image/map/ICON_yellow_pin.svg' />
							<p>관광</p>
						</li>
					</ul>
				</div>
				<div className={style.list_wrap}>
					<h2>제제픽의 추천 리스트</h2>
					<List />
				</div>
				<div className={style.totallist_wrap}>
					<h2>전체 여행 정보</h2>
					<TotalList tabTxt={tabTxt}/>
				</div>
			</div>
		</>
	)
}

export default Page