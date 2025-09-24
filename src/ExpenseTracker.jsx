import { useState, useEffect } from "react";
import Header from "./components/Header";
import WarningAlert from "./components/WarningAlert";
import ExpenseSummary from "./components/ExpenseSummary";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";

export default function ExpenseTracker() {

  // Expense Array
  const [expenses, setExpenses] = useState(() => {
    const storedExpenses = localStorage.getItem("expenses");
    return storedExpenses ? JSON.parse(storedExpenses) : [];
  });
  
  const [newExpenseName, setNewExpenseName] = useState("");
  const [newExpenseAmount, setNewExpenseAmount] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const EXPENSE_LIMIT = 5000;
  const totalExpenses = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  useEffect(() => {
    if (totalExpenses > EXPENSE_LIMIT) {
      setShowWarning(true);
      const timer = setTimeout(() => setShowWarning(false), 5000);
      return () => clearTimeout(timer);
    } else {
      setShowWarning(false);
    }
  }, [totalExpenses]);

  // useEffect(() => {
  //   const storedExpenses = localStorage.getItem("expenses");
  //   if (storedExpenses) {
  //     setExpenses(JSON.parse(storedExpenses));
  //   }
  // }, []);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = () => {
    if (
      newExpenseName.trim() &&
      newExpenseAmount &&
      parseFloat(newExpenseAmount) > 0
    ) {
      setIsAdding(true);
      setTimeout(() => {
        const newExpense = {
          id: Date.now(),
          name: newExpenseName.trim(),
          amount: parseFloat(newExpenseAmount),
        };
        setExpenses([...expenses, newExpense]);
        setNewExpenseName("");
        setNewExpenseAmount("");
        setIsAdding(false);
      }, 300);
    }
  };


  const updateExpense = (id, newName) => {
    setExpenses(
      expenses.map((expense) =>
        expense.id === id ? { ...expense, name: newName } : expense
      )
    );
  };


  const deleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") addExpense();
  };

  // const addExpense = () => {
  //   if (
  //     newExpenseName.trim() &&
  //     newExpenseAmount &&
  //     parseFloat(newExpenseAmount) > 0
  //   ) {
  //     setIsAdding(true);
  //     setTimeout(() => {
  //       const newExpense = {
  //         id: Date.now(),
  //         name: newExpenseName.trim(),
  //         amount: parseFloat(newExpenseAmount),
  //       };
  //       const updatedExpenses = [...expenses, newExpense];
  //       setExpenses(updatedExpenses);
  //       localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
  //       setNewExpenseName("");
  //       setNewExpenseAmount("");
  //       setIsAdding(false);
  //     }, 300);
  //   }
  // };

  // const updateExpense = (id, newName) => {
  //   const updatedExpenses = expenses.map((expense) =>
  //     expense.id === id ? { ...expense, name: newName } : expense
  //   );
  //   setExpenses(updatedExpenses);
  //   localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
  // };
  
  // const deleteExpense = (id) => {
  //   const updatedExpenses = expenses.filter((expense) => expense.id !== id);
  //   setExpenses(updatedExpenses);
  //   localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
  // };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8">
        <Header />
        {showWarning && (
          <WarningAlert total={totalExpenses} limit={EXPENSE_LIMIT} />
        )}
        <ExpenseSummary
          expenses={expenses}
          total={totalExpenses}
          limit={EXPENSE_LIMIT}
        />
        <ExpenseForm
          name={newExpenseName}
          setName={setNewExpenseName}
          amount={newExpenseAmount}
          setAmount={setNewExpenseAmount}
          addExpense={addExpense}
          isAdding={isAdding}
          handleKeyPress={handleKeyPress}
        />
        <ExpenseList expenses={expenses} onDelete={deleteExpense} onUpdate={updateExpense} />
      </div>
    </div>
  );
}
