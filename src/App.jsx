import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [transactions, setTransactions] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchTransactions();
  }, []); 
//  **the fetchTransactions function is used to fetch the transactions from the server.**//
  const fetchTransactions = async () => {
    try {
      const response = await axios.get('http://localhost:8001/transactions');
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };
//  **the  handleFormSubmit - handle the form submission by creating a new transaction object
//  , sending a POST request to the server,adds the new transaction and fetches the updated list.**//
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const newTransaction = {
      date: form.date.value,
      description: form.description.value,
      category: form.category.value,
      amount: parseFloat(form.amount.value),
    };
// axios allows you to set default header intercept request and respond whereas
//  fetch has a simpler API that lacks some of these feature requiring add libs
    try {
      await axios.post('http://localhost:8001/transactions', newTransaction);
      fetchTransactions();
    } catch (error) {
      console.error('Error adding transaction:', error);
    }

    form.reset();
  };


  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };
// handleDelete is used to delete a transaction by id and then fetches the updated list.//
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8001/transactions/${id}`);
      fetchTransactions();
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  // filter each transaction
  let filteredTransactions = [];
  if (transactions) {
    filteredTransactions = transactions.filter(
      (transaction) =>
        transaction.description.toLowerCase().includes(searchTerm) ||
        transaction.category.toLowerCase().includes(searchTerm)
    );
  }
//  **the code block is used to display the transactions in a list.**//
  return (
    <div className='app-container'>
      <h2>Add Transaction</h2>
      <form onSubmit={handleFormSubmit}>
        <input type="date" name="date" placeholder="Date" />
        <input type="text" name="description" placeholder="Description" />
        <input type="text" name="category" placeholder="Category" />
        <input type="number" name="amount" placeholder="Amount" />
        <button type="submit">ADD TRANSACTION</button>
      </form>
      <h2>Search Transactions</h2>
      <input type="text" placeholder="Search for transactions ..." onChange={handleSearch} />

      <h2>All Transactions</h2>
      <ol className="transaction-details">
        {filteredTransactions.length === 0 ? (
          <li>No transactions to display.</li>
        ) : (
          filteredTransactions.map((transaction) => (
            <li key={transaction.id}>
              <div className='transactions-list'>
                <span className='item'>{transaction.description}</span>
                <span className='item'>{transaction.category}</span>
                <span className='item'>{transaction.amount}</span>
                <button onClick={() => handleDelete(transaction.id)}>Delete</button>
              </div>
            </li>
          ))
        )}
      </ol>
    </div>
  );
}

export default App;