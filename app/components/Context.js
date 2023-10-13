"use client"
const { createContext, useState, useEffect } = require("react");

export const MyContext = createContext(null);

function Context({children}) {
  const [headStatus,setHeadStatus] = useState(true);
  const [btmStatus,setBtmStatus] = useState(true);
  useEffect(()=>{
    // setHeadStatus(false)
  },[])
  return (
    <MyContext.Provider value={{headStatus,setHeadStatus, btmStatus, setBtmStatus}}>
      {children}
    </MyContext.Provider>
  )
}

export default Context