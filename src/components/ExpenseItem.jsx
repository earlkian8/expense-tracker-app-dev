import { useState } from "react";
import { Trash2, Edit3 } from "lucide-react";

export default function ExpenseItem({ expense, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(expense.name);
  const [editedAmount, setEditedAmount] = useState(expense.amount);

  const handleSave = () => {
    if (editedName.trim() && parseFloat(editedAmount) > 0) {
      onUpdate(expense.id, editedName.trim(), parseFloat(editedAmount));
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedName(expense.name);
    setEditedAmount(expense.amount);
    setIsEditing(false);
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString("en-PH", {
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="group hover:bg-gray-50 transition-colors duration-150">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4 flex-1">
          <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg group-hover:bg-gray-200 transition-colors">
            <span className="text-gray-600 font-bold text-sm">
              {expense.name.charAt(0).toUpperCase()}
            </span>
          </div>

          <div className="flex-1 min-w-0">
            {isEditing ? (
              <div className="grid grid-cols-2 gap-3">
                {/* Editable Name */}
                <input
                  type="text"
                  className="w-full border-0 border-b-2 border-blue-500 focus:outline-none text-lg font-semibold text-gray-900 bg-transparent pb-1"
                  value={editedName}
                  autoFocus
                  onChange={(e) => setEditedName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSave();
                    if (e.key === "Escape") handleCancel();
                  }}
                />
                {/* Editable Amount */}
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  className="w-full border-0 border-b-2 border-blue-500 focus:outline-none text-lg font-semibold text-gray-900 bg-transparent pb-1 text-right"
                  value={editedAmount}
                  onChange={(e) => setEditedAmount(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSave();
                    if (e.key === "Escape") handleCancel();
                  }}
                />
              </div>
            ) : (
              <div>
                <h4
                  className="text-lg font-semibold text-gray-900 truncate cursor-pointer hover:text-blue-600 transition-colors"
                  onClick={() => setIsEditing(true)}
                >
                  {expense.name}
                </h4>
                <p className="text-sm text-gray-500 mt-1">
                  {formatDate(expense.id)}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          {!isEditing && (
            <div className="text-right">
              <div className="text-xl font-bold text-gray-900">
                ₱{expense.amount.toLocaleString("en-PH", {
                  minimumFractionDigits: 2,
                })}
              </div>
            </div>
          )}

          <div
            className="flex items-center gap-2 
            md:opacity-0 md:group-hover:opacity-100 
            transition-opacity duration-200"
          >
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 rounded-lg hover:bg-blue-100 text-gray-400 hover:text-blue-600 transition-colors"
              title="Edit expense"
            >
              <Edit3 size={16} />
            </button>
            <button
              onClick={() => onDelete(expense.id)}
              className="p-2 rounded-lg hover:bg-red-100 text-gray-400 hover:text-red-600 transition-colors"
              title="Delete expense"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
