import { Plus, Calculator } from "lucide-react";
import { useState } from "react";

export default function ExpenseForm({
  name,
  setName,
  amount,
  setAmount,
  addExpense,
  isAdding,
  budgetLimit,
  setBudgetLimit
}) {

  // Error state
  const [errors, setErrors] = useState({ name: false, amount: false });
  // const [showBudgetForm, setShowBudgetForm] = useState(false);

  // Validate function
  const validateAndAdd = () => {
    const newErrors = {
      name: !name.trim(),
      amount: !amount || parseFloat(amount) <= 0
    };
    
    setErrors(newErrors);
    
    if (!newErrors.name && !newErrors.amount) {
      addExpense();
      setErrors({ name: false, amount: false });
    }
  };

  // name change
  const handleNameChange = (e) => {
    setName(e.target.value);
    if (errors.name && e.target.value.trim()) {
      setErrors(prev => ({ ...prev, name: false }));
    }
  };

  // amount change
  const handleAmountChange = (e) => {
    setAmount(e.target.value);
    if (errors.amount && e.target.value && parseFloat(e.target.value) > 0) {
      setErrors(prev => ({ ...prev, amount: false }));
    }
  };

  // enter
  const handleKeyPressWithValidation = (e) => {
    if (e.key === 'Enter') {
      validateAndAdd();
    }
  };

  // limit change
  const handleLimitChange = (e) => {
    const value = e.target.value;

    if (value === "") {
      setBudgetLimit("");
    } else if (!isNaN(value) && Number(value) >= 0) {
      setBudgetLimit(Number(value));
    }
  };



  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      {/* Add Expense Form */}
      <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-black/5 rounded-lg">
            <Plus className="w-6 h-6 text-black" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Add New Expense</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expense Description
            </label>
            <input
              type="text"
              placeholder="e.g., Grocery shopping, Gas bill, Coffee"
              value={name}
              onChange={handleNameChange}
              onKeyPress={handleKeyPressWithValidation}
              className={`w-full px-4 py-3 border rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none transition-all ${
                errors.name
                  ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                  : 'border-gray-300 focus:border-black focus:ring-2 focus:ring-gray-100'
              }`}
            />
            {errors.name && (
              <p className="mt-2 text-sm text-red-600 font-medium">Description is required</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount (₱)
            </label>
            <div className="relative">
              <input
                type="number"
                placeholder="0.00"
                step="0.01"
                min="0"
                value={amount}
                onChange={handleAmountChange}
                onKeyPress={handleKeyPressWithValidation}
                className={`w-full px-4 py-3 border rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none transition-all ${
                  errors.amount
                    ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                    : 'border-gray-300 focus:border-black focus:ring-2 focus:ring-gray-100'
                }`}
              />
              {errors.amount && (
                <p className="mt-2 text-sm text-red-600 font-medium">
                  {!amount ? 'Amount is required' : 'Amount must be greater than 0'}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="md:col-span-3">
            <button
              onClick={validateAndAdd}
              disabled={isAdding}
              className="w-full px-8 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 justify-center"
            >
              {isAdding ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <Plus size={20} />
                  Add Expense
                </>
              )}
            </button>
          </div>
        </div>

      </div>

      {/* Budget Settings */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Calculator className="w-5 h-5 text-purple-600" />
            </div>
            <h4 className="font-bold text-gray-900">Budget Settings</h4>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Monthly Budget Limit
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                ₱
              </span>
              <input
                type="number"
                value={budgetLimit}
                onChange={handleLimitChange}
                className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black focus:ring-2 focus:ring-gray-100 transition-all"
                placeholder="10000"
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Set your monthly spending limit to track budget usage
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-xs font-medium text-gray-600 uppercase tracking-wider mb-2">
              Current Settings
            </div>
            <div className="text-lg font-bold text-gray-900">
              ₱{budgetLimit.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
            </div>
            <div className="text-sm text-gray-600">monthly limit</div>
          </div>
        </div>
      </div>
    </div>
  );
}
