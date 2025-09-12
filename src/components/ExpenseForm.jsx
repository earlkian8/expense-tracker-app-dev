import { Plus } from "lucide-react";

export default function ExpenseForm({
  name,
  setName,
  amount,
  setAmount,
  addExpense,
  isAdding,
  handleKeyPress,
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Add Expense</h3>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Expense name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyPress={handleKeyPress}
          className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
        />
        <div className="flex gap-3">
          <input
            type="number"
            placeholder="Amount"
            step="0.01"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
          />
          <button
            onClick={addExpense}
            disabled={isAdding}
            className="px-6 py-3 bg-black text-white rounded-md font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 justify-center min-w-[100px]"
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
