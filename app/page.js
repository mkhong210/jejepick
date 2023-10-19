"use client"
import Image from 'next/image'
import style from './page.module.scss'
import { useContext, useEffect } from 'react';
import { MyContext } from './components/Context';
import { useRouter } from 'next/navigation';

export default function Home() {
	const { status, headStatus, setHeadStatus, btmStatus, setBtmStatus } = useContext(MyContext);
	const router = useRouter();
	
/* 	useEffect(() => {
		setHeadStatus(true);
		setBtmStatus(true);
		// common();
	}, []); */

	setTimeout(() => router.push('/pages/login'), 1000);

	return (
		<>
			<div className={style.splash_bg}>
				<div className={style.splash_logo + ` inner`}>
					<div>
						<img src="/asset/common/logo_2.svg" />
					</div>
				</div>
				<ul className={style.splash_balloon + ` inner`}>
					<li className={style.splash_balloon1}>
						<div>
							<img src="/asset/image/splash/IMG_balloon1.png" />
						</div>
					</li>
					<li className={style.splash_balloon2 + ` inner`}>
						<div>
							<img src="/asset/image/splash/IMG_balloon2.png" />
						</div>
					</li>
				</ul>
			</div>
		</>
	)
}
