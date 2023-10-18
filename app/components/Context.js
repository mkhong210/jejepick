"use client"
const { createContext, useState, useEffect } = require("react");

export const MyContext = createContext(null);

function Context({ children }) {
	const [headStatus, setHeadStatus] = useState(false);
	const [btmStatus, setBtmStatus] = useState(false);
	const [testResultValue, setTestResultValue] = useState([]);

	// if(window.localStorage){
	// 	const loginID = window.localStorage.getItem('loginId');
	// 	console.log(loginID);
	// }

	const status = () => {
		const header = document.getElementsByClassName('header')[0];
		const hide = header.classList.contains('hidden');
		console.log(header, headStatus);

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
	useEffect(() => {
		// setHeadStatus(false)
	}, [])

	const value ={ 
    status, headStatus,setHeadStatus,
    btmStatus, setBtmStatus,
    testResultValue,setTestResultValue
	}


	return (
		<MyContext.Provider value={value}>
			{children}
		</MyContext.Provider>
	)
}

export default Context