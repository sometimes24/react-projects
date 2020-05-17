import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTextFilter, sortByAmount, sortByDate } from "../redux/actions/filters";

export const ExpenseListFilter = () => {
  const filters = useSelector((state) => state.filters);
  const dispatch = useDispatch();

  return (
    <div>
      <input type="text" value={filters.text} onChange={(e) => dispatch(setTextFilter(e.target.value))}/>
      <select
        value={filters.sortBy}
        onChange={e => {
          const value = e.target.value;
          if (value === "date") {
            dispatch(sortByDate())
          } else if (value === "amount") {
            dispatch(sortByAmount())
          }
        }}
      >
        <option value="date">Date</option>
        <option value="amount">Amount</option>
      </select>
    </div>
  )
}