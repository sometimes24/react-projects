import { createStore, combineReducers } from "redux";
import { v4 as uuid } from 'uuid';
console.log("redux-expensify");


// --- EXPENSES ---
// Action

const addExpense = ({
  description = "", note = "", amount = 0, createdAt = 0
} = {}) => ({
  type: "ADD_EXPENSE",
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt
  },
});

const removeExpense = (id) => ({
  type: "REMOVE_EXPENSE",
  id
});

const editExpense = (id, updates) => ({
  type: "EDIT_EXPENSE",
  id,
  updates
});

// Reducer
const expensesReducerDefaultState = [];
const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      return [
        ...state,
        action.expense
      ];
    case "REMOVE_EXPENSE":
      return state.filter(({ id }) => id !== action.id);
    case "EDIT_EXPENSE":
      return state.map(expense => {
        if (expense.id === action.id) {
          return {
            ...expense,
            ...action.updates
          }
        } else {
          return expense;
        }
      });
    default:
      return state;
  }
};

// --- FILTER ---
// Action

const setTextFilter = (text = "") => ({
  type: "SET_TEXT_FILTER",
  text
});

const sortByAmount = () => ({
  type: "SORT_BY_AMOUNT"
});

const sortByDate = () => ({
  type: "SORT_BY_DATE"
});

const setStartDate = (startDate) => ({
  type: "SET_START_DATE",
  startDate
});

const setEndDate = (endDate) => ({
  type: "SET_END_DATE",
  endDate
});

// Reducer
const filterReducerDefaultState = {
    text: "",
    sortBy: "date", // amount or date
    startDate: undefined,
    endDate: undefined
};
const filterReducer = (state = filterReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_TEXT_FILTER":
      return {
        ...state,
        text: action.text
      };
    case "SORT_BY_DATE":
      return {
        ...state,
        sortBy: "date"
      };
    case "SORT_BY_AMOUNT":
      return {
        ...state,
        sortBy: "amount"
      };
    case "SET_START_DATE":
      return {
        ...state,
        startDate: action.startDate
      };
    case "SET_END_DATE":
      return {
        ...state,
        endDate: action.endDate
      };
    default:
      return state;
  }
};

const store = createStore(combineReducers({
  expenses: expensesReducer,
  filter: filterReducer
}));

// SELECTORS
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate}) => {
  return expenses
    .filter(expense => typeof startDate !== "number" || startDate <= expense.createdAt)
    .filter(expense => typeof endDate !== "number" || endDate >= expense.createdAt)
    .filter(expense => expense.description.toLowerCase().includes(text.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "amount") {
        return a.amount < b.amount ? 1 : -1;
      } else if (sortBy === "date") {
        return a.createdAt < b.createdAt ? 1 : -1
      }
    });
};

store.subscribe(() => {
  const { expenses, filter } = store.getState();
  console.log(getVisibleExpenses(expenses, filter));
});

const itemOne = store.dispatch(addExpense({ description: "rent", amount: 5000, createdAt: 500 }));
const itemTwo = store.dispatch(addExpense({ description: "coffee", amount: 300, createdAt: 500 }));

// store.dispatch(removeExpense(itemOne.expense.id));
// store.dispatch(editExpense(itemTwo.expense.id, { amount: 500 }));
//
// store.dispatch(setTextFilter("rent"));
// store.dispatch(setTextFilter());
//
// store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

store.dispatch(setStartDate(225));
store.dispatch(setEndDate(5000));

// const demoState = {
//   expenses: [{
//     id: 1,
//     description: "Some description with rent",
//     note: "Some note with rent",
//     amount: 54500,
//     createdAt: 0
//   }],
//   filter: {
//     text: "rent",
//     sortBy: "amount", // amount or date
//     startDate: undefined,
//     endDate: undefined
//   }
// };