import React from "react";
import { useSelector } from "react-redux";
import { getVisibleExpenses } from "../redux/selectors/expenses";
import { ExpenseListItem } from "./ExpenseListItem";

export const ExpenseList = () => {

  const visibleExpenses = useSelector((state) => getVisibleExpenses(state.expenses, state.filters));

  return (
    <div>
      <h1>Expense List</h1>
      {visibleExpenses.map(expense => <ExpenseListItem key={expense.id} expense={expense}/>)}
    </div>
  );
};