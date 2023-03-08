import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { Provider } from 'react-redux';

import { BrowserRouter } from 'react-router-dom';
import { store } from './redux/store';
import { QueryClient, QueryClientProvider } from 'react-query';
// import { QueryClientProvider } from 'react-query/types/react';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
  </BrowserRouter>,
);
