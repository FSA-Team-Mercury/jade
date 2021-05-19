import moment from "moment";

const currentMonthExpenses = (data) => {
  const beginnignOfMonth = moment(new Date())
    .startOf("month")
    .format("YYYY-MM-DD");
  let currMonthData = data.filter((trans) => trans.date < beginnignOfMonth);

  console.log(currMonthData);
  return currMonthData;
};

export default currentMonthExpenses;
