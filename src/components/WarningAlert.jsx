import { AlertTriangle } from "lucide-react";

export default function WarningAlert({ total, limit }) {
  return (
    <div className="bg-white border border-red-200 rounded-lg p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
        <div>
          <h3 className="text-red-900 font-medium">Budget exceeded</h3>
          <p className="text-red-700 text-sm mt-1">
            Total expenses (₱{total.toFixed(2)}) exceed your limit of ₱
            {limit.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}
