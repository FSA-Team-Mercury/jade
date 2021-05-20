import moment from "moment";

const currentMonthExpenses = (data) => {
  const beginningOfMonth = moment(new Date())
    .startOf('month')
    .format('YYYY-MM-DD');

  let currMonthData = data.filter((trans) => trans.date >= beginningOfMonth);

  
  return currMonthData;
};

export default currentMonthExpenses;
