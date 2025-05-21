import { useContext, useState, createContext } from 'react';

export const LayoutContext = createContext();
export const useLayoutContext = () => useContext(LayoutContext);
export function LayoutContextProvider({ children }) {
  const [isRootLayoutHidden, setIsRootLayoutHidden] = useState(false);

  return (
    <LayoutContext.Provider
      value={{ isRootLayoutHidden, setIsRootLayoutHidden }}
    >
      {children}
    </LayoutContext.Provider>
  );
}
