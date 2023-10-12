import React from 'react'
import style from './common.module.scss'
import Link from 'next/link'

function BtmNavi() {
	return (
		<footer className={style.footer}>
			<ul className={style.footer_wrap + ' inner'}>
				<li className={style.footer_item}>
					<Link href='/favorite'>
						<img src='/asset/common/Icon_favorite.svg' />
						<p>찜</p>
					</Link>
				</li>
				<li className={style.footer_item}>
					<Link href='/course-list'>
						<img src='/asset/common/Icon_course-list.svg' />
						<p>코스만들기</p>
					</Link>
				</li>
				<li className={style.footer_item}>
					<Link href='/main'>
						<img src='/asset/common/Icon_home.svg' />
						<p>홈</p>
					</Link>
				</li>
				<li className={style.footer_item}>
					<Link href='/list'>
						<img src='/asset/common/Icon_list.svg' />
						<p>추천리스트</p>
					</Link>
				</li>
				<li className={style.footer_item}>
					<Link href='/mypage'>
						<img src='/asset/common/Icon_mypage.svg' />
						<p>마이페이지</p>
					</Link>
				</li>
			</ul>
		</footer>
	)
}

export default BtmNavi