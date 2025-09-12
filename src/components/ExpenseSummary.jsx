import { TrendingUp } from "lucide-react";

export default function ExpenseSummary({ expenses, total, limit }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Total Expenses</h2>
          <p className="text-gray-600 text-sm">{expenses.length} items</p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-gray-600" />
            <span className="text-3xl font-bold text-gray-900">
              ₱{total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* progress bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Budget usage</span>
          <span>{((total / limit) * 100).toFixed(1)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-500 ${
              total > limit ? "bg-red-500" : "bg-black"
            }`}
            style={{ width: `${Math.min((total / limit) * 100, 100)}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
