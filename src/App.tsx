import React, { Suspense } from 'react';

import { Routes, Route } from 'react-router-dom';

import './scss/App.scss';

import { Header } from './components/Header';
import { useAppSelector } from './redux/hooks';

function App() {
  const theme = useAppSelector((state) => state.app.theme);

  const Main = React.lazy(() => import('./Pages/Main'));
  const CountryPage = React.lazy(() => import('./Pages/CountryPage'));

  return (
    <main className={theme === 'light' ? 'wrapper' : 'wrapper dark'}>
      <Header theme={theme} />
      <div className="content">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Main theme={theme} />} />
            <Route path="/country/:id" element={<CountryPage theme={theme} />} />
          </Routes>
        </Suspense>
      </div>
    </main>
  );
}

export default App;
