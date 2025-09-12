import { useState, useEffect } from "react";
import Header from "./components/Header";
import WarningAlert from "./components/WarningAlert";
import ExpenseSummary from "./components/ExpenseSummary";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";

export default function ExpenseTracker() {
  const [expenses, setExpenses] = useState([]);

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

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") addExpense();
  };

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
        <ExpenseList expenses={expenses} onDelete={deleteExpense} />
      </div>
    </div>
  );
}
