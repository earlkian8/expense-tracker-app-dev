import { PhilippinePeso, } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm mb-8">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-14 h-14 bg-black rounded-xl shadow-lg">
              <PhilippinePeso className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                Expense Tracker
              </h1>
              <p className="text-gray-600 mt-1">
                Smart financial management dashboard
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
