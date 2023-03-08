import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

import { Link, useNavigate, useParams } from 'react-router-dom';

import arrow_left from '../images/arrow-left.svg';
import arrow_left_light from '../images/arrow-left-light.svg';
import loader from '../images/loader.svg';

import { ibg } from '../utils/ibg';
import { ThemeProps } from '../types/types';

async function fetchOneCountry(name: string | undefined) {
  const { data } = await axios.get(`https://restcountries.com/v3.1/name/${name}?fullText=true`);

  return data;
}

async function fetchBorders(borders: string[]) {
  const str = borders.join(',');
  const { data } = await axios.get(`https://restcountries.com/v3.1/alpha?codes=${str}`);

  return data;
}

const CountryPage: React.FC<ThemeProps> = ({ theme }) => {
  const params = useParams();
  const id = params.id;

  const navigate = useNavigate();

  const goBack = () => navigate(-1 as never, { replace: true });

  React.useEffect(() => {
    ibg();
  });

  const { data, error, isLoading, isFetching } = useQuery(['page', id], () => fetchOneCountry(id), {
    keepPreviousData: true,
  });
  const borders = data && data[0].borders;

  const { data: borderItems } = useQuery(['borders', borders], () => fetchBorders(borders), {
    keepPreviousData: true,
    enabled: !!borders,
  });

  // if (isLoading) {
  //   return <h3>Идет загрузка...</h3>;
  // }
  // if (error) {
  //   return <h3>Ошибка при получение данных</h3>;
  // }
  // if (!data) {
  //   return <h3>Нет данных</h3>;
  // }

  const currencyName = (val: { name: string; symbol: string }[]) => {
    return val[0].name;
  };

  return (
    <div className={theme === 'light' ? 'page' : 'page dark'}>
      <div className="container">
        <button className="page-back" onClick={() => goBack()}>
          {theme === 'light' ? (
            <img src={arrow_left} alt="" />
          ) : (
            <img src={arrow_left_light} alt="" />
          )}

          <span>Back</span>
        </button>
        <div className="page-row">
          {isLoading || isFetching ? (
            <div className="loader">
              <img src={loader} alt="" />
            </div>
          ) : (
            data.map((page: any) => (
              <>
                <div className="page-row__columns" key={page.name.common}>
                  <div className="page-row__img ibg">
                    {!page.flags.svg ? (
                      <img src={page.flags.png} alt="" />
                    ) : (
                      <img src={page.flags.svg} alt="" />
                    )}
                  </div>
                </div>
                <div className="page-row__columns">
                  <div className="page-row__desc">
                    <h2 className="page-row__desc-title">{page.name.common}</h2>
                    <div className="page-row__desc-body">
                      <div className="page-row__desc-each">
                        <p>
                          Native Name:<span>{page.altSpellings[1]}</span>
                        </p>
                        <p>
                          Population:<span>{page.population.toLocaleString('en')}</span>
                        </p>
                        <p>
                          Region:<span>{page.region ? page.region : '""'}</span>
                        </p>
                        <p>
                          Sub Region:<span>{page.subregion ? page.subregion : '""'}</span>
                        </p>
                        <p>
                          Capital:<span>{page.capital ? page.capital : '""'}</span>
                        </p>
                      </div>
                      <div className="page-row__desc-each">
                        <p>
                          Top Level Domain: <span>{page.tld[0]}</span>
                        </p>
                        <p>
                          Currencies:{' '}
                          <span>
                            {page.currencies ? currencyName(Object.values(page.currencies)) : '""'}
                          </span>
                        </p>
                        <p>
                          Languages:
                          {Object.values(page.languages).map((item: any) => (
                            <span key={item}>{item}</span>
                          ))}
                        </p>
                      </div>
                    </div>
                    <div className="page-row__desc-border">
                      <span>Border Countries:</span>
                      {borderItems ? (
                        borderItems.map((item: any) => (
                          <Link to={`/country/${item.name.common}`} key={item.name.common}>
                            {item.name.common}
                          </Link>
                        ))
                      ) : (
                        <div> &#128532;</div>
                      )}
                    </div>
                  </div>
                </div>
              </>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
export default CountryPage;
