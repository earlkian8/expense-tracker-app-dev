import { TrendingUp, Target, Calendar, AlertCircle, DollarSign } from "lucide-react";

export default function ExpenseSummary({ expenses, total, limit = 5000 }) {
  const budgetPercentage = (total / limit) * 100;
  const remaining = Math.max(0, limit - total);
  const isOverBudget = total > limit;
  const avgExpense = expenses.length > 0 ? total / expenses.length : 0;
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      {/* Main Total Card */}
      <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-black/5 rounded-xl">
                <TrendingUp className="w-7 h-7 text-black" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Total Expenses
                </h2>
                <p className="text-gray-500 text-sm">
                  {expenses.length} {expenses.length === 1 ? 'transaction' : 'transactions'} this period
                </p>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="text-4xl font-black text-gray-900 mb-2">
                ₱{total.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
              </div>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-gray-600">
                  Budget: ₱{limit.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                </span>
                {isOverBudget ? (
                  <div className="flex items-center gap-1 text-red-600 font-medium">
                    <AlertCircle className="w-4 h-4" />
                    Over by ₱{(total - limit).toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                  </div>
                ) : (
                  <span className="text-green-600 font-medium">
                    ₱{remaining.toLocaleString('en-PH', { minimumFractionDigits: 2 })} remaining
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Progress Bar */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">Budget Usage</span>
            <span className={`text-sm font-bold ${isOverBudget ? 'text-red-600' : 'text-gray-900'}`}>
              {budgetPercentage.toFixed(1)}%
            </span>
          </div>
          <div className="relative">
            <div className="w-full bg-gray-100 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all duration-700 ease-out ${
                  isOverBudget 
                    ? "bg-red-500 shadow-lg shadow-red-200" 
                    : budgetPercentage > 80 
                      ? "bg-amber-500 shadow-lg shadow-amber-200"
                      : "bg-black shadow-lg shadow-gray-200"
                }`}
                style={{ width: `${Math.min(budgetPercentage, 100)}%` }}
              />
            </div>
            {isOverBudget && (
              <div className="absolute -top-1 right-0 w-2 h-5 bg-red-500 rounded-full animate-pulse" />
            )}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="space-y-4">
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Target className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Average
            </span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            ₱{avgExpense.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
          </div>
          <p className="text-gray-500 text-sm mt-1">per transaction</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Budget
            </span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            ₱{limit.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
          </div>
          <p className="text-gray-500 text-sm mt-1">monthly limit</p>
        </div>
      </div>
    </div>
  );
}