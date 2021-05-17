const createBudgetBars = (data) => {
  const categories = data.map((budget) => {
    return budget.category;
  });
  const axisPoints = [];

  const goalAmount = data.map((budget, idx) => {
    axisPoints.push(idx + 1);
    return { category: idx + 1, amount: budget.goalAmount };
  });
  const currentAmount = data.map((budget, idx) => {
    return {
      category: idx + 1,
      amount: budget.currentAmount,
    };
  });

  return { goalAmount, currentAmount, categories, axisPoints };
};

export default createBudgetBars;
