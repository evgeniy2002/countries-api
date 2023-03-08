import React from 'react';
import { Countries } from '../components/Countries';
import { Filter } from '../components/Filter';
import { ThemeProps } from '../types/types';

const Main: React.FC<ThemeProps> = ({ theme }) => {
  return (
    <>
      <Filter theme={theme} />
      <Countries theme={theme} />
    </>
  );
};

export default Main;
