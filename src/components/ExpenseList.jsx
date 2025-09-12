import ExpenseItem from "./ExpenseItem";
import { DollarSign } from "lucide-react";

export default function ExpenseList({ expenses, onDelete }) {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4">Expenses</h3>
      {expenses.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
          <DollarSign className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No expenses added yet</p>
          <p className="text-gray-500 text-sm mt-1">
            Add your first expense using the form above
          </p>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 shadow-sm">
          <div className="max-h-80 overflow-y-auto space-y-3 pr-2">
            {expenses.map((expense) => (
              <ExpenseItem
                key={expense.id}
                expense={expense}
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
