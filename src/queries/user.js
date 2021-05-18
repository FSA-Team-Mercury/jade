import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    logIn(username: $username, password: $password) {
      token
    }
  }
`;

export const SIGNUP = gql`
  mutation Signup($username: String!, $password: String!) {
    signUp(username: $username, password: $password) {
      token
    }
  }
`;
export const GET_USER = gql`
  query GetUser {
    user {
      id
      username
    }
  }
`;
export const GET_USER_DATA = gql`
  query GetUserData {
    user {
      id
      username
      accounts {
        auth_token
      }
    }
    budgets {
      id
      category
      goalAmount
      currentAmount
    }
    userBadges {
      id
      type
      badgeImage
    }
  }
`;

export const USER_PLAID_AUTH = gql`
  query GetUser {
    user {
      id
      username
      accounts {
        auth_token
        type
      }
    }
  }
`;
