import React from 'react';

import { useTransactionsContext } from '../context/TransactionsContext';
import { numberWithCommas } from '../utils/format';

const IncomeExpenses = () => {
  const { transactions } = useTransactionsContext();

  const amounts = transactions.map((transaction) => transaction.amount);
  const income = amounts
    .filter((amount) => amount > 0)
    .reduce((acc, item) => acc + item, 0);

  const expense =
    amounts
      .filter((amount) => amount < 0)
      .reduce((acc, item) => acc + item, 0) * -1;

  console.log(transactions, amounts, income, expense);

  return (
    <div className='inc-exp-container'>
      <div>
        <h4>Income</h4>
        <p className='money plus'>+${numberWithCommas(income.toFixed(2))}</p>
      </div>
      <div>
        <h4>Expenses</h4>
        <p className='money minus'>-${numberWithCommas(expense.toFixed(2))}</p>
      </div>
    </div>
  );
};

export default IncomeExpenses;
