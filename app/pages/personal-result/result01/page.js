import React from 'react'
import style from '../result.module.scss'

function page() {
	return (
		<>
			<div className={style.testbefore}>
				<div className={style.testbeforeback}></div>
				<div className={style.test + ` inner`}></div>
				<div className={style.result}>
					<div className={style.resulttop}>
						<div>퉁퉁이님의 여행타입은?</div>
						<div className={style.resultprofile}>
							<div className={style.propen}>모험가의 자질을 가진 금귤</div>
							<div className={style.resultimg}>
								<img src='/asset/image/test/TEST_character1.png'></img>
							</div>
							<div className={style.tag}>
								<span>활동적</span>
								<span>활기찬</span>
								<span>즉흥적</span>
							</div>
						</div>
					</div>
					<div className={style.resultbottom}>
						<div className={style.resultcon}>
							<div className={style.propencon}>
								<div>
									<img src='/asset/image/test/resultmarker.svg'></img>
									계획을 체계적으로 짜는 건 잘 못해요. 일단 늘어놓고 나면 어떻게 되지 않을까요?
								</div>
								<div>
									<img src='/asset/image/test/resultmarker.svg'></img>
									호기심이 많아 여행 중 마주치는 새로운 것들에 흥미를 느껴요. 가끔은 여행 도중 번뜩이는 아이디어가 떠오르기도 해요.
								</div>
								<div>
									<img src='/asset/image/test/resultmarker.svg'></img>
									아무런 계획 없이 즉흥적으로 떠나는 여행이 좋아요! 왠지 더 설레는 기분이 들지 않나요?
								</div>
								<div>
									<img src='/asset/image/test/resultmarker.svg'></img>
									여행 중 갑자기 비가 오거나 한 시간 걸려 달려온 맛집이 문을 닫아도 쉽게 멘붕이 오지 않아요. 비가 오면 운치 있어 좋고 맛집이 문을 닫은 덕에 더 맛있는 식당을 찾게 될 수도 있죠!
								</div>
								<div>
									<img src='/asset/image/test/resultmarker.svg'></img>
									짜릿한 모험을 좋아해요! 정적인 곳 보다는 활동적이고 재밌는 게 많은 여행지가 좋아요
								</div>
							</div>
							<div className={style.mate}>
								<div className={style.bestmate}>
									<p>나와 맞는 유형</p>
									<h4>자유로운 영혼을 가진 제주마</h4>
									<img src='/asset/image/test/TEST_character2.png'></img>
								</div>
								<div className={style.worstmate}>
									<p>나와 안맞는 유형</p>
									<h4>똑부러진 동백꽃</h4>
									<img src='/asset/image/test/TEST_character6.png'></img>
								</div>
							</div>
						</div>
						<div className={style.listmove}>맞춤 여행지 보러가기</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default page