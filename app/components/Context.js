"use client"
const { createContext } = require("react");

export const MyContext = createContext(null);

function Context({children}) {
  return (
    <MyContext.Provider value={100}>
      {children}
    </MyContext.Provider>
  )
}

export default Context