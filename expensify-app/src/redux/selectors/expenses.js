export const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate} = {}) => {
  return (expenses || [])
    .filter(expense => typeof startDate !== "number" || startDate <= expense.createdAt)
    .filter(expense => typeof endDate !== "number" || endDate >= expense.createdAt)
    .filter(expense => text ? expense.description.toLowerCase().includes(text.toLowerCase()) : true)
    .sort((a, b) => {
      if (sortBy === "amount") {
        return a.amount < b.amount ? 1 : -1;
      } else if (sortBy === "date") {
        return a.createdAt < b.createdAt ? 1 : -1
      }
    });
};