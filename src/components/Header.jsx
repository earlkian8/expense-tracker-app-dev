import { PhilippinePeso } from "lucide-react";

export default function Header() {
  return (
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-12 h-12 bg-black rounded-full mb-4">
        <PhilippinePeso className="w-6 h-6 text-white" />
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Expense Tracker</h1>
      <p className="text-gray-600">Simple expense management</p>
    </div>
  );
}
