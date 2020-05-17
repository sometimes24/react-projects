import React from "react";

export const ExpenseForm = () => {

  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="Description"
        />
        <input
          type="number"
          placeholder="Amount"
        />
        {/* Date */}
        <textarea
          placeholder="Add a note for your expense (optional)"
        />
        <button>Add Expense</button>
      </form>
    </div>
  );
};