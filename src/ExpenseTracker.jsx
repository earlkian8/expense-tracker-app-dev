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

  // States
  const [newExpenseName, setNewExpenseName] = useState("");
  const [newExpenseAmount, setNewExpenseAmount] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  // User-defined budget limit
  const [budgetLimit, setBudgetLimit] = useState(() => {
    const storedLimit = localStorage.getItem("budgetLimit");
    return storedLimit ? Number(storedLimit) : 10000;
  });

  // Store the total expense using reduce
  const totalExpenses = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  // Determine whether the total expenses is greater than expense limit
  useEffect(() => {
    if (totalExpenses > budgetLimit) {
      setShowWarning(true);
      const timer = setTimeout(() => setShowWarning(false), 8000);
      return () => clearTimeout(timer);
    } else {
      setShowWarning(false);
    }
  }, [totalExpenses, budgetLimit]);

  // Save expenses to localStorage
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  // Save budget limit to localStorage
  useEffect(() => {
    localStorage.setItem("budgetLimit", budgetLimit.toString());
  }, [budgetLimit]);

  // add
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

  // edit
  const updateExpense = (id, newName) => {
    setExpenses(
      expenses.map((expense) =>
        expense.id === id ? { ...expense, name: newName } : expense
      )
    );
  };

  // delete
  const deleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  // enter key for adding
  const handleKeyPress = (e) => {
    if (e.key === "Enter") addExpense();
  };

  // Handle changing the user-defined limit
  const handleLimitChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value) && value > 0) {
      setBudgetLimit(Number(value));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        {showWarning && (
          <WarningAlert total={totalExpenses} limit={budgetLimit} />
        )}
        
        <ExpenseSummary
          expenses={expenses}
          total={totalExpenses}
          limit={budgetLimit}
        />
        
        <ExpenseForm
          name={newExpenseName}
          setName={setNewExpenseName}
          amount={newExpenseAmount}
          setAmount={setNewExpenseAmount}
          addExpense={addExpense}
          isAdding={isAdding}
          handleKeyPress={handleKeyPress}
          budgetLimit={budgetLimit}
          setBudgetLimit={setBudgetLimit}
        />
        
        <ExpenseList 
          expenses={expenses} 
          onDelete={deleteExpense} 
          onUpdate={updateExpense} 
        />
      </main>
    </div>
  );
}