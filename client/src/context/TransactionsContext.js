import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

// Initial state
const initialState = {
  transactions: [],
  error: null,
  loading: true
};

// Create context
export const TransactionsContext = createContext();

// Export context hooks to access state and actions
export function useTransactionsContext() {
  return useContext(TransactionsContext);
}

// Provider component
export const TransactionsProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(initialState.transactions);
  const [errors, setErrors] = useState(initialState.error);
  const [loading, setLoading] = useState(initialState.loading);

  // Actions
  async function getTransactions() {
    try {
      const response = await axios.get('/api/v1/transactions');

      setTransactions(response.data.data);
    } catch (err) {
      setErrors(err.response.data.error);
    }
  }

  async function deleteTransaction(id) {
    try {
      // delete from database
      await axios.delete(`/api/v1/transactions/${id}`);

      // delete from ui
      const newTransactionsList = transactions.filter(
        (transaction) => transaction._id !== id
      );
      setTransactions(newTransactionsList);
    } catch (err) {
      setErrors(err.response.data.error);
    }
  }

  async function addTransaction(transaction) {
    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    };

    try {
      // add to database
      const response = await axios.post(
        '/api/v1/transactions',
        transaction,
        config
      );

      // add to ui
      const newList = [...transactions];
      newList.push(response.data.data);
      setTransactions(newList);
    } catch (err) {
      setErrors(err.response.data.error);
    }
  }

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        errors,
        loading,
        deleteTransaction,
        addTransaction,
        getTransactions
      }}>
      {children}
    </TransactionsContext.Provider>
  );
};
