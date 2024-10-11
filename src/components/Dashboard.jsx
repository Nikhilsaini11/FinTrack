import React, { useEffect, useState } from 'react'
import Logo from './Logo'

const Dashboard = (props) => {
    const { refresh } = props;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');
    const [isExpense, setIsExpense] = useState(true); // true for expense, false for budget
    const [balance, setBalance] = useState({ expense: 0.00, budget: 0.00 }); // true for expense, false for budget

    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const storedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
        const storedBalance = JSON.parse(localStorage.getItem('balance')) || { expense: 0.00, budget: 0.00 };

        setTransactions(storedTransactions);
        setBalance(storedBalance);
        console.log("Local Storge Data fetched", storedTransactions, storedBalance);
    }, [refresh]);
    const handleRemoveTransaction = (id) => {
        setTransactions(transactions.filter(transaction => transaction.id !== id));
        let removedTransaction = transactions.find(transaction => transaction.id === id);
        let newBalance = {};

        if(removedTransaction.type === 'expense'){
            newBalance = { ...balance, expense: balance.expense - parseFloat(removedTransaction.amount) };
        }else {
            newBalance = { ...balance, budget: balance.budget - parseFloat(removedTransaction.amount) };

        }
        setBalance(newBalance);
        localStorage.setItem('balance', JSON.stringify({ ...newBalance }));
        localStorage.setItem('transactions', JSON.stringify(transactions.filter(transaction => transaction.id !== id)));
    };
    const handleAddClick = () => {
        // Logic to add the transaction goes here
        console.log(`Added: ${isExpense ? 'Expense' : 'Budget'} of $${amount} - ${message}`);
        let newTransaction = { id: Date.now(), type: isExpense ? 'expense' : 'budget', amount: parseFloat(amount), message: message };
        setTransactions([...transactions, newTransaction]);
        let newBalance = {};
        if (isExpense) {
            newBalance = { ...balance, expense: balance.expense + parseFloat(amount) };
        } else {
            newBalance = { ...balance, budget: balance.budget + parseFloat(amount) };
        }
        setBalance(newBalance);
        console.log(transactions, balance);
        localStorage.setItem('transactions', JSON.stringify([...transactions, newTransaction]));
        localStorage.setItem('balance', JSON.stringify({ ...newBalance }));
        setAmount('');
        setMessage('');
        setIsModalOpen(false);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleOverlayClick = (e) => {
        if (e.target.id === 'modal-overlay') {
            closeModal();
        }
    };

    return (
        <div id="dashboard" className="bg-gradient-to-r from-[#1e2024] to-[#23272b] text-[#e0e0e0] px-6 py-12 pt-20 min-h-screen">
            {/* Logo and Description Section */}
            <div className="flex flex-col items-center justify-center mb-12">
                {/* Logo */}
                <Logo />

                {/* Description */}
                <div className="text-center max-w-2xl">
                    <p className="text-lg">
                        <span className="font-bold text-[#ff014f]">FinTrack</span> is your ultimate expense tracking solution designed to simplify budgeting and financial management.
                        Easily monitor your spending, set budgets, and track expenses in real-time.
                        Take control of your finances with powerful insights, detailed reports, and a user-friendly interface.
                    </p>
                </div>
            </div>

            {/* Add Expense Section */}
            <div id='addExpense' className="flex w-full md:w-9/12 mx-auto flex-col items-center align-middle justify-center h-64 bg-[#1c1e22] rounded-lg shadow-lg p-4">
                <div className="flex justify-between w-full mb-4">
                    {/* Balance on the Left */}
                    <h2 className="text-2xl text-[#e0e0e0]">Balance: ₹{balance.budget - balance.expense}</h2>

                    {/* Add Button on the Right */}
                    <button
                        className="bg-[#ff014f] text-white px-4 py-2 rounded hover:bg-[#ff3366] shadow-md shadow-[#000000]/30 transition-transform transform hover:scale-105"
                        onClick={() => setIsModalOpen(true)}
                    >
                        Add
                    </button>

                </div>

                {/* Expenses and Budget Sections */}
                <div className="flex justify-between w-full">
                    <div className="bg-gradient-to-r from-red-700 to-red-500 rounded-lg p-4 flex-1 mr-2 shadow-lg">
                        <h3 className="text-lg text-white">Expenses</h3>
                        <p className="text-[#e0e0e0]">₹{balance.expense}</p>
                    </div>
                    <div className="bg-gradient-to-r from-green-500 to-green-700 rounded-lg p-4 flex-1 ml-2 shadow-lg">
                        <h3 className="text-lg text-white">Budget</h3>
                        <p className="text-[#e0e0e0]">₹{balance.budget}</p>
                    </div>
                </div>

                {/* Modal for Adding Transaction */}
                {isModalOpen && (
                    <div id="modal-overlay" className="fixed inset-0 flex items-center justify-center bg-black/50" onClick={handleOverlayClick}>
                        <div className="bg-gradient-to-r from-[#1e2024] to-[#23272b] p-8 rounded-lg shadow-2xl relative w-96">
                            <button
                                className="absolute top-4 right-4 text-gray-400 hover:text-white"
                                onClick={closeModal}
                            >
                                ✖️
                            </button>
                            <h2 className="text-xl text-[#e0e0e0] mb-4">Add Transaction</h2>
                            <label className="block text-[#e0e0e0] mb-2">Amount</label>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
                                placeholder="Enter amount"
                            />
                            <label className="block text-[#e0e0e0] mb-2">Message</label>
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
                                placeholder="Enter a message"
                            />
                            <div className="flex justify-between mb-4">
                                <button
                                    className={`px-4 py-2 rounded ${isExpense ? 'bg-red-600' : 'bg-gray-700'}`}
                                    onClick={() => setIsExpense(true)}
                                >
                                    Expense
                                </button>
                                <button
                                    className={`px-4 py-2 rounded ${!isExpense ? 'bg-green-600' : 'bg-gray-700'}`}
                                    onClick={() => setIsExpense(false)}
                                >
                                    Budget
                                </button>
                            </div>
                            <button
                                className="bg-[#ff014f] text-white px-4 py-2 rounded hover:bg-[#ff3366] transition block mx-auto"
                                onClick={handleAddClick}
                            >
                                Add Transaction
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Transactions Section */}
            <div id="transactions" className="mt-6 flex flex-col items-center w-full">
                <h2 className="text-3xl text-gradient bg-clip-text text-transparent bg-gradient-to-r from-[#ff014f] to-[#ff3366] mb-4">
                    Transactions
                </h2>
                <div className="flex flex-col w-full md:w-9/12">
                    {transactions.length === 0 && <p className="text-[#e0e0e0] text-center mt-1 mb-1">No Transactions</p>}
                    {transactions.map(transaction => (
                        <div
                            key={transaction.id}
                            className={`flex justify-between items-center p-2 mb-4 rounded-lg bg-[#1c1e22] border-l-4 border-r-4 ${transaction.type === 'expense' ? 'border-red-600' : 'border-green-600'}`}
                        >
                            <div>
                                <span className="font-bold">{transaction.message}</span> - ₹{transaction.amount}
                            </div>
                            <button
                                className="text-red-600 hover:text-red-800"
                                onClick={() => handleRemoveTransaction(transaction.id)}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>


    )
}

export default Dashboard
