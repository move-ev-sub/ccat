'use client';

import React from 'react';

type SubNavContextType = {
  base: string;
};

const SubNavContext = React.createContext<SubNavContextType>(
  {} as SubNavContextType
);

export const useSubNavContext = () => React.useContext(SubNavContext);

export function SubNavProvider({
  value,
  ...props
}: React.ComponentProps<typeof SubNavContext.Provider>) {
  return (
    <SubNavContext.Provider
      value={{
        ...value,
        base: value.base || '',
      }}
      {...props}
    />
  );
}
