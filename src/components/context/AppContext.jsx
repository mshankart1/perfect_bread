'use client';

import { createContext, useContext, useState } from 'react';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [data, setData] = useState(null);

  return <AppContext.Provider value={{ data, setData }}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}
