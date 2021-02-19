import React, { useEffect } from 'react';

import { useTransactionsContext } from '../context/TransactionsContext';
import Transaction from './Transaction';

const TransactionList = () => {
  const { transactions, getTransactions } = useTransactionsContext();

  useEffect(() => {
    getTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h3>History</h3>
      <ul className='list'>
        {transactions.map((transaction) => (
          <Transaction key={transaction._id} transaction={transaction} />
        ))}
      </ul>
    </>
  );
};

export default TransactionList;
