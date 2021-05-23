const createBudgetBars = (data) => {
  const axisPoints = [];

  const goalAmount = data.map((budget, idx) => {
    axisPoints.push(idx + 1);
    return { x: budget.category, y: budget.goalAmount / 100 };
  });
  const currentAmount = data.map((budget) => {
    return {
      x: budget.category,
      y: budget.currentAmount / 100,
    };
  });

  return { goalAmount, currentAmount, axisPoints };
};

export default createBudgetBars;
