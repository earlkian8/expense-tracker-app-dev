import { Plus } from "lucide-react";
import { useState } from "react";

export default function ExpenseForm({
  name,
  setName,
  amount,
  setAmount,
  addExpense,
  isAdding,
  handleKeyPress,
}) {
  const [errors, setErrors] = useState({ name: false, amount: false });

  const validateAndAdd = () => {
    const newErrors = {
      name: !name.trim(),
      amount: !amount || parseFloat(amount) <= 0
    };
    
    setErrors(newErrors);
    
    // If no errors, proceed with adding expense
    if (!newErrors.name && !newErrors.amount) {
      addExpense();
      // Clear errors after successful add
      setErrors({ name: false, amount: false });
    }
  };

  // Clear error when user starts typing
  const handleNameChange = (e) => {
    setName(e.target.value);
    if (errors.name && e.target.value.trim()) {
      setErrors(prev => ({ ...prev, name: false }));
    }
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
    if (errors.amount && e.target.value && parseFloat(e.target.value) > 0) {
      setErrors(prev => ({ ...prev, amount: false }));
    }
  };

  const handleKeyPressWithValidation = (e) => {
    if (e.key === 'Enter') {
      validateAndAdd();
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Add Expense</h3>
      <div className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Expense name"
            value={name}
            onChange={handleNameChange}
            onKeyPress={handleKeyPressWithValidation}
            className={`w-full px-4 py-3 border rounded-md text-gray-900 placeholder-gray-500 focus:outline-none transition-all ${
              errors.name
                ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                : 'border-gray-300 focus:border-black focus:ring-1 focus:ring-black'
            }`}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">This field is required</p>
          )}
        </div>

        {/* Responsive container */}
        <div className="flex flex-col sm:flex-row gap-3 sm:items-start">
          <div className="flex-1">
            <input
              type="number"
              placeholder="Amount"
              step="0.01"
              min="0"
              value={amount}
              onChange={handleAmountChange}
              onKeyPress={handleKeyPressWithValidation}
              className={`w-full px-4 py-3 border rounded-md text-gray-900 placeholder-gray-500 focus:outline-none transition-all ${
                errors.amount
                  ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                  : 'border-gray-300 focus:border-black focus:ring-1 focus:ring-black'
              }`}
            />
            <div className="h-6 mt-1">
              {errors.amount && (
                <p className="text-sm text-red-600">
                  {!amount ? 'This field is required' : 'Amount must be greater than 0'}
                </p>
              )}
            </div>
          </div>

          <button
            onClick={validateAndAdd}
            disabled={isAdding}
            className="px-6 py-3 bg-black text-white rounded-md font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 justify-center sm:min-w-[100px] w-full sm:w-auto flex-shrink-0"
          >
            {isAdding ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                <Plus size={18} />
                Add
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}