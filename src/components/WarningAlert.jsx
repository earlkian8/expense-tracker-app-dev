import { AlertTriangle, X } from "lucide-react";

export default function WarningAlert({ total, limit }) {
  const overage = total - limit;
  const overspendPercentage = ((overage / limit) * 100).toFixed(1);

  return (
    <div className="bg-white border-l-4 border-red-500 rounded-lg shadow-sm mb-6">
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="flex items-center justify-center w-10 h-10 bg-red-100 rounded-full">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-red-900">
                Budget Exceeded!
              </h3>
              <div className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-bold">
                +{overspendPercentage}% over budget
              </div>
            </div>
            
            <p className="text-red-800 mb-4">
              You've spent <span className="font-bold">₱{total.toLocaleString('en-PH', { minimumFractionDigits: 2 })}</span>, 
              which is <span className="font-bold">₱{overage.toLocaleString('en-PH', { minimumFractionDigits: 2 })}</span> over 
              your monthly budget of ₱{limit.toLocaleString('en-PH', { minimumFractionDigits: 2 })}.
            </p>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-semibold text-red-900 mb-2">Recommendations:</h4>
              <ul className="text-red-800 text-sm space-y-1">
                <li>• Review your recent expenses and identify unnecessary purchases</li>
                <li>• Consider increasing your monthly budget if needed</li>
                <li>• Set up spending alerts for better budget control</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}