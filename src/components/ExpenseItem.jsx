import { useState } from "react";
import { Trash2 } from "lucide-react";

export default function ExpenseItem({ expense, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(expense.name);

  const handleSave = () => {
    if (editedName.trim() && editedName !== expense.name) {
      onUpdate(expense.id, editedName.trim());
    }
    setIsEditing(false);
  };

  return (
    <div className="group bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200 hover:border-gray-300 m-2">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          {isEditing ? (
            <input
              type="text"
              className="border-b border-gray-300 focus:outline-none text-lg font-medium text-gray-900"
              value={editedName}
              autoFocus
              onChange={(e) => setEditedName(e.target.value)}
              onBlur={handleSave}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSave();
                if (e.key === "Escape") {
                  setEditedName(expense.name);
                  setIsEditing(false);
                }
              }}
            />
          ) : (
            <h3
              className="font-medium text-gray-900 text-lg cursor-pointer"
              onClick={() => setIsEditing(true)}
            >
              {expense.name}
            </h3>
          )}
          <p className="text-gray-500 text-sm mt-1">#{expense.id}</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-2xl font-semibold text-gray-900">
            ₱{expense.amount.toFixed(2)}
          </span>
          <button
            onClick={() => onDelete(expense.id)}
            className="sm:opacity-0 group-hover:opacity-100 sm:transition-opacity duration-200 p-2 rounded-md hover:bg-gray-100 text-gray-400 hover:text-red-500"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
