import React, {useEffect,useState} from 'react'

function App() {
  const [transactions, setTransactions] = useState([])
  const [search, setSearch] = useState('')
  const [filteredTransactions, setFilteredTransactions] = useState([])
  const [sortType, setSortType] = useState('asc')
  
const handleSubmit = (e) => {
  e.preventDefault()
  const newTransaction = {
    id: Math.floor(Math.random() * 10000),
    date: e.target.date.value,
    description: e.target.description.value,
    category: e.target.category.value,
    amount: e.target.amount.value
  }
  setTransactions([...transactions, newTransaction])
  e.target.reset()
}


  useEffect(() => {
  fetch('http://localhost:8001/transactions')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch (error => console.log(error))
  }, [])

  return (
    <div>
        <form onSubmit={handleSubmit} >
           <input value={transactions.id } onChange={(e)=>{setTransactions(e.target.value)}} type="number" id="" />
           <input value={transactions.date } onChange={(e)=>{setTransactions(e.target.value)}}type="text"  id="date" />
           <input value={transactions.description } onChange={(e)=>{setTransactions(e.target.value)}}type="text" id ="description" />
           <input value={transactions.category} onChange={(e)=>{setTransactions(e.target.value)}} type="text" id="category" />
           <input value={transactions.amount } onChange={(e)=>{setTransactions(e.target.value)}}type="number" id ="amount" />
           <button type="submit">Submit</button>
        </form>
           <h2> search transaction</h2>
           <input type="text" id="search" />
        {/* <ol> {transactions.map(transaction => (
            <li key={transaction.id}>
                <span id="id"> {transaction.id} </span>
                <span id="date"> {transaction.date} </span>
                <span id ="description"> {transaction.description} </span>
                <span id ="category"> {transaction.category}</span>
                <span id ="amount"> {transaction.amount}</span>
            </li>
        ))}
          
        </ol> */}
    </div>
  )
}

export default App