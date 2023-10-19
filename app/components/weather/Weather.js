"use client";
import React, { useState, useEffect } from "react";
import style from '../../pages/main/main.module.scss'

export default function Weather() {
	const [weatherData, setWeatherData] = useState({});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchData() {
			const today = new Date();
			const year = today.getFullYear();
			const month = today.getMonth() + 1;
			const date = today.getDate();
			const day = `${year}${month.toString().padStart(2, "0")}${date
				.toString()
				.padStart(2, "0")}`;

			const hours = today.getHours();
			console.log(hours);
			
			// const minutes = today.getMinutes();
			// console.log(minutes);
			
			let hoursM, ho;

			if (today.getMinutes() < 40) {
				hoursM = hours - 1;
				if (hoursM < 0) {
					hoursM = 22;
					// 날짜도 이전 날로 변경해야 할 수 있음
					// 예시: day = ...
				}else{
					hoursM = hours - 1;
				}
			} 
			
			ho = `${hoursM.toString().padStart(2, "0")}30`;

			console.log(ho);
			const nx = 48;
			const ny = 32;

			const response = await fetch(
				`https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst?serviceKey=kchW%2FinovxOaPimbytjUfP5PgKg1NOqtx3o1O%2BVLS98jxZB2guWNxaxcmGNSlSARyrfb%2BVOfOBZn8FcgYqsKxg%3D%3D&numOfRows=100&pageNo=1&base_date=${day}&base_time=${ho}&nx=${nx}&ny=${ny}&dataType=JSON`
			);

			if (response.ok) {
				const jsonData = await response.json();
				setWeatherData(jsonData.response.body.items.item);
			}
			setLoading(false);
		}
		// console.log(weatherData);

		fetchData();
	}, []);

	let skyText = "";
	let tmpValue = "";


	if (weatherData.length > 0) {
		// 데이터가 유효한 경우 데이터를 처리
		const tmpInfo = weatherData.find((item) => item.category === "T1H");
		tmpValue = `${tmpInfo.fcstValue}`;

		const skyData = weatherData.find((item) => item.category === "SKY");
		const ptyData = weatherData.find((item) => item.category === "PTY");

		// console.log(skyData);

		if (skyData && ptyData) {
			if (skyData.fcstValue === "3") {
				skyText = "구름많음";
			} else if (skyData.fcstValue === "4") {
				skyText = "흐림";
			} else {
				skyText = "맑음";
			}

			if (
				ptyData.fcstValue === "1" ||
				ptyData.fcstValue === "2" ||
				ptyData.fcstValue === "5" ||
				ptyData.fcstValue === "6"
			) {
				skyText = "비";
			} else if (ptyData.fcstValue === "3" || ptyData.fcstValue === "7") {
				skyText = "눈";
			}
		}
	}

	console.log(tmpValue);

	return (
		<>
			<span>{tmpValue}</span><span className={style.tmp}>°</span><span>C</span>
			<span className="sky">{skyText}</span>
		</>
	);
}
