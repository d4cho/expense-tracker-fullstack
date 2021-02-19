import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { TransactionsProvider } from './context/TransactionsContext';

ReactDOM.render(
  <React.StrictMode>
    <TransactionsProvider>
      <App />
    </TransactionsProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
