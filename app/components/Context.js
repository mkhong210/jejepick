"use client"
const { createContext, useState, useEffect } = require("react");

export const MyContext = createContext(null);

function Context({children}) {
  const [headStatus,setHeadStatus] = useState(true);
  const [btmStatus,setBtmStatus] = useState(true);
  const [testResultValue, setTestResultValue] = useState();
  useEffect(()=>{
    // setHeadStatus(false)
  },[])
  const value ={
    headStatus,setHeadStatus, 
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