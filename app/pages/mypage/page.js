import React from 'react'
import Memberform from '@/app/components/MypageMemberCheck'
import style from './mypage.module.scss'

function page() {
	return (
		<>
			<div className={style.profile +` inner`}>
				<div className={style.proback}></div>
				<div className={style.mytop}>
					<div></div>
					<div>마이페이지</div>
					<div>프로필편집</div>
				</div>
				<div className={style.procon}>
					<div className={style.procontop}>
						<div className={style.profileimg}></div>
						<div>
							<p>‘계획대로 되고있어’ 천혜향</p>
							<h3>김혜수님</h3>
						</div>
					</div>
					<div className={style.proconbottom}>
						<span>#계획적</span>
						<span>#활동적</span>
						<span>#열정</span>
					</div>
				</div>
			</div>
			<div className={style.prolist +` inner`}>
				<div className={style.mypagecon1}>
					<div className={style.myevent}>
						<div className={style.recom}>
							<h4>추천 여행지가 아쉬우신가요?</h4>
							<p>테스트 다시하기</p>
						</div>
						<div className={style.jejeimg}></div>
					</div>
					<div className={style.myevent}>
						<div className={style.recom}>
							<h4>제제픽이 말아주는 추천 리스트 다시보기</h4>
							<p>추천 리스트 보기</p>
						</div>
						<div className={style.jejeimg}></div>
					</div>
				</div>
				<div className={style.mycontopnav}>
					<h2>나의 찜 목록</h2>
					<p>더보기</p>
				</div>
				<div className={style.mypagecon2}>
					{/* <div className={style.heartlistnone}>찜하러 가기</div> */}
					<div className={style.heartlist}>
						<div>
							<div className={style.heartcon}>
								<h3>똘똘이 국밥집</h3>
								<div>하트</div>
							</div>
						</div>
						<div>
							<h3>똘똘이 국밥집</h3>
							<div>하트</div>
						</div>
						<div>
							<h3>똘똘이 국밥집</h3>
							<div>하트</div>
						</div>
					</div>
				</div>
				<div className={style.mycontopnav}>
					<h2>나의 여행코스</h2>
					<p>더보기</p>
				</div>
				<div className={style.mypagecon3}>
					<div className={style.corselistnone}>
						추가+
					</div>
					{/* <div className={style.corselist}>
						<div className={style.corsename}>뚜벅이 1일차 제주도 코스</div>
						<div className={style.corsedel}>삭제</div>
					</div> */}
				</div>
			</div>
			<div className={style.logout}>로그아웃</div>
		</>
	)
}

export default page