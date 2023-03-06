import React, { createContext, useState } from 'react';
export type SessionType = {
    session: Record<string,any>;
    setSession: React.Dispatch<React.SetStateAction<{ session: {}; }>>;
}

export const SessionContext = createContext({session:{}, setSession: () => {return true}});

export const SessionProvider = ({ children }) => {
    const [session, setSession] = useState({session:{}})
    const value={session,setSession};
    return (
      //@ts-ignore
      <SessionContext.Provider value={value}>
        {children}
      </SessionContext.Provider>
    );

  }
