"use client"
const { createContext, useState, useEffect } = require("react");

export const MyContext = createContext(null);

function Context({ children }) {
	const [headStatus, setHeadStatus] = useState(false);
	const [btmStatus, setBtmStatus] = useState(false);
	const [testResultValue, setTestResultValue] = useState();


	const common = () => {
		const header = document.getElementsByClassName('header')[0];
		if (header) {
			main.classList.remove('no')
			main.classList.add('on')
		} else {
			main.classList.remove('on')
			main.classList.add('no')
		}
	}
	useEffect(() => {
		// setHeadStatus(false)
	}, [])

	const value ={ 
    common, headStatus,setHeadStatus, 
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