import React from 'react';

import { useTransactionsContext } from '../context/TransactionsContext';
import { numberWithCommas } from '../utils/format';

const Transaction = ({ transaction }) => {
  const { deleteTransaction } = useTransactionsContext();

  const sign = transaction.amount > 0 ? '+' : '-';
  const style = transaction.amount > 0 ? 'plus' : 'minus';

  return (
    <li className={style}>
      {transaction.text}{' '}
      <span>
        {' '}
        {sign}${numberWithCommas(Math.abs(transaction.amount).toFixed(2))}{' '}
      </span>
      <button
        className='delete-btn'
        onClick={() => deleteTransaction(transaction._id)}>
        x
      </button>
    </li>
  );
};

export default Transaction;
