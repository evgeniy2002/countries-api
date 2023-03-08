import React from 'react';

import s from './Filter.module.scss';

import search from '../../images/search.svg';
import search_light from '../../images/search-light.svg';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { changeSearch, setSortBy } from '../../redux/app/slice';

import arrow_down from '../../images/arrow-down.svg';
import arrow_down_light from '../../images/arrow-down-light.svg';
import { ThemeProps } from '../../types/types';

const regions = ['Africa', 'America', 'Asia', 'Europe', 'Oceania'];

export const Filter: React.FC<ThemeProps> = ({ theme }) => {
  const { sortBy, search: searchInput } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();

  const regionRef = React.useRef<any>();

  const [popup, setPopup] = React.useState(false);

  const handlePopup = () => {
    setPopup(!popup);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    const path = event.composedPath && event.composedPath();
    if (!path.includes(regionRef.current)) {
      setPopup(false);
    }
  };

  React.useEffect(() => {
    document.body.addEventListener('click', handleOutsideClick);
  });

  const chooseRegion = (region: string) => {
    dispatch(setSortBy(region));
    setPopup(false);
  };

  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeSearch(e.target.value));
  };

  return (
    <section className={theme === 'light' ? s.filter : s.filter + ' ' + s.dark} ref={regionRef}>
      <div className="container">
        <div className={s.filter_row}>
          <div className={s.filter_row__input}>
            {theme === 'light' ? <img src={search} alt="" /> : <img src={search_light} alt="" />}
            <input
              type="text"
              name="search"
              placeholder="Search for a country..."
              value={searchInput}
              onChange={(e) => changeInput(e)}
            />
          </div>
          <div className={s.filter_sortBy}>
            <div className={s.filter_sortBy__label} onClick={handlePopup}>
              <span>{!sortBy ? 'Filter by region' : sortBy} </span>
              {theme === 'light' ? (
                <img src={arrow_down} alt="" />
              ) : (
                <img src={arrow_down_light} alt="" />
              )}
            </div>
            {popup && (
              <ul className={s.filter_sortBy__popup}>
                {regions.map((item, idx) => (
                  <li key={idx} onClick={() => chooseRegion(item)}>
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
