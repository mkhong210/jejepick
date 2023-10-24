"use client"

import axios from "axios";

const { createContext, useState, useEffect } = require("react");

export const MyContext = createContext(null);

function Context({ children }) {
	const [headStatus, setHeadStatus] = useState(true);
	const [btmStatus, setBtmStatus] = useState(true);
	const [testResultValue, setTestResultValue] = useState([]);

	const [jim, setJim] = useState([]);
	const [isStatus,setIsStatus] =useState(false);
	const status = () => {
		// const header = document.getElementsByClassName('header')[0];
		// const hide = header.classList.contains('on');
		// console.log(header, headStatus);

		// const statusplz = document.getElementById('main')
		// const plz = statusplz.classList.contains('no')
		// console.log(statusplz, plz)

		// if (!hide) {
		// 	main.classList.remove('on')
		// 	main.classList.add('no')
		// } else {
		// 	main.classList.remove('no')
		// 	main.classList.add('on')
		// }
	}


	//찜에서 데이터 가져오기
	const favorite = async ()=>{
		const loginID = window.localStorage.getItem('loginId'); 
		if(loginID){
			const  response =await axios.get(`/server_api/item?profile=${loginID}`);
			setJim(response.data);
			console.log(response.data);
		}
	}
	
	useEffect(() => {
		favorite();
		// setHeadStatus(false)
	},[isStatus])

	const value ={ 
    status, headStatus,setHeadStatus,
    btmStatus, setBtmStatus,
    testResultValue,setTestResultValue,
	jim,setJim,
	isStatus,setIsStatus
	}


	return (
		<MyContext.Provider value={value}>
			{children}
		</MyContext.Provider>
	)
}

export default Context