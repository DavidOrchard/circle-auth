import React, { createContext, useState } from 'react';
export type SessionType = {
    session: boolean;
    setSession: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SessionContext = createContext({session:false, setSession: (session:boolean) => {return true}});
//@ts-ignore
export const SessionProvider = ({ children }) => {
    const [session, setSession] = useState(false)
    const value:SessionType = {session,setSession};
    return (
      //@ts-ignore
      <SessionContext.Provider value={value}>
        {children}
      </SessionContext.Provider>
    );

  }
