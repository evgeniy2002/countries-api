import { useIsFetching, useQuery } from 'react-query';
import axios from 'axios';
import React from 'react';

import { Link } from 'react-router-dom';

import s from './Countries.module.scss';
import { useAppSelector } from '../../redux/hooks';
import { ibg } from '../../utils/ibg';

import loader from '../../images/loader.svg';
import { ThemeProps } from '../../types/types';

async function fetchCountries({ sortBy }: { sortBy: string }) {
  if (sortBy !== '') {
    const { data } = await axios.get(`https://restcountries.com/v3.1/region/${sortBy}`);
    return data;
  } else {
    const { data } = await axios.get('https://restcountries.com/v3.1/all');
    return data;
  }
}
export const Countries: React.FC<ThemeProps> = ({ theme }) => {
  const { sortBy, search } = useAppSelector((state) => state.app);

  React.useEffect(() => {
    ibg();
  });

  const {
    data: countries,
    isLoading,
    isFetching,
    error,
  } = useQuery(['countries', sortBy], () => fetchCountries({ sortBy }), {
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    enabled: true,
  });

  // if (isLoading) {
  //   return <h3>Идет загрузка...</h3>;
  // }
  // if (error) {
  //   return <h3>Ошибка при получение данных</h3>;
  // }
  // if (!countries) {
  //   return <h3>Нет данных</h3>;
  // }

  return (
    <section className={theme === 'light' ? s.carts : s.carts + ' ' + s.dark}>
      <div className="container">
        <div className={s.carts_row}>
          {isLoading || isFetching ? (
            <div className="loader">
              <img src={loader} alt="" />
            </div>
          ) : (
            countries
              .filter((item: any) =>
                item.name.official.toLowerCase().includes(search.toLowerCase()),
              )
              .map((el: any) => (
                <div className={s.carts_row__columns} key={el.name.common}>
                  <Link to={`/country/${el.name.common}`} className={s.carts_row__item}>
                    <div className={s.carts_row__img + ' ' + 'ibg'}>
                      {!el.flags.svg ? (
                        <img src={el.flags.png} alt="" />
                      ) : (
                        <img src={el.flags.svg} alt="" />
                      )}
                    </div>
                    <div className={s.carts_row__body}>
                      <h3>{el.name.common}</h3>
                      <div className={s.carts_row__info}>
                        <div className={s.carts_row__desc}>
                          <p>Population:</p>
                          <span>{el.population.toLocaleString('en')}</span>
                        </div>
                        <div className={s.carts_row__desc}>
                          <p>Region:</p>
                          <span>{el.region}</span>
                        </div>
                        <div className={s.carts_row__desc}>
                          <p>Capital:</p>
                          <span>{el.capital ? el.capital : '""'}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
          )}
        </div>
      </div>
    </section>
  );
};
