import { gql } from "@apollo/client";

export const ADD_BUDGET = gql`
  mutation AddBudget($category: String, $goalAmount: Int, $currentAmount: Int) {
    addBudget(
      category: $category
      goalAmount: $goalAmount
      currentAmount: $currentAmount
    ) {
      id
      category
      goalAmount
      currentAmount
    }
  }
`;
export const GET_BUDGETS = gql`
  query Budgets {
    budgets {
      id
      category
      goalAmount
      currentAmount
    }
  }
`;
// ********************* //
// ***** MUTATIONS ***** //
// ********************* //

export const UPDATE_AMOUNT = gql`
  mutation UpdateBudgets($goalAmount: Int, $id: ID) {
    updateBudget(goalAmount: $goalAmount, id: $id) {
      id
      goalAmount
      category
    }
  }
`;

export const DELETE_BUDGET = gql`
  mutation DeleteBudget($id: ID) {
    deleteBudget(id: $id) {
      id
      goalAmount
      category
    }
  }
`;
