import { createContext, useState } from "react";

export const UserContext = createContext({})

export function UserContextProvider({ children }) {
  const [userInfo, setUserInfo] = useState({})
  const [auth, setAuth]= useState({})
  return (
    <UserContext.Provider value={{ userInfo, setUserInfo, auth, setAuth }}>
      {children}
    </UserContext.Provider>)
}