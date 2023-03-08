import React from 'react';
import { Link } from 'react-router-dom';

import night from '../../images/night-mode.svg';
import light from '../../images/light-mode.svg';

import { changeMode } from '../../redux/app/slice';
import { useAppDispatch } from '../../redux/hooks';

import s from './Header.module.scss';
import { ThemeProps } from '../../types/types';

export const Header: React.FC<ThemeProps> = ({ theme }) => {
  const dispatch = useAppDispatch();

  const toggleMode = () => {
    dispatch(changeMode(theme === 'light' ? 'dark' : 'light'));
  };

  return (
    <header className={theme === 'light' ? s.header : s.header + ' ' + s.dark}>
      <div className="container">
        <div className={s.header_row}>
          <h2>
            <Link to="/">Where in the world?</Link>
          </h2>

          <div className={s.header_row__mode} onClick={toggleMode}>
            {theme === 'light' ? <img src={night} alt="" /> : <img src={light} alt="" />}

            <span>Dark Mode</span>
          </div>
        </div>
      </div>
    </header>
  );
};
