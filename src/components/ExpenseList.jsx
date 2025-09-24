import { useState } from "react";
import { Search, Calendar } from "lucide-react";
import ExpenseItem from "./ExpenseItem";

export default function ExpenseList({ expenses, onDelete, onUpdate }) {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredExpenses = expenses.filter(expense =>
    expense.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalAmount = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Recent Expenses</h3>
            <p className="text-gray-500 text-sm">
              {filteredExpenses.length} of {expenses.length} transactions
            </p>
          </div>
          
          {filteredExpenses.length > 0 && (
            <div className="text-right">
              <div className="text-lg font-bold text-gray-900">
                ₱{totalAmount.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
              </div>
              <div className="text-sm text-gray-500">total shown</div>
            </div>
          )}
        </div>

        {expenses.length > 0 && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search expenses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black focus:ring-2 focus:ring-gray-100 transition-all"
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="min-h-[200px]">
        {expenses.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Calendar className="w-8 h-8 text-gray-400" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">No expenses yet</h4>
            <p className="text-gray-500 max-w-sm">
              Start tracking your expenses by adding your first transaction using the form above.
            </p>
          </div>
        ) : filteredExpenses.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">No matching expenses</h4>
            <p className="text-gray-500">
              Try adjusting your search terms to find what you're looking for.
            </p>
          </div>
        ) : (
          <div className="max-h-96 overflow-y-auto">
            <div className="divide-y divide-gray-100">
              {filteredExpenses.map((expense) => (
                <ExpenseItem
                  key={expense.id}
                  expense={expense}
                  onDelete={onDelete}
                  onUpdate={onUpdate}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

