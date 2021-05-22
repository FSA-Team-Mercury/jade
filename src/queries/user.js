import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    logIn(username: $username, password: $password) {
      token
    }
  }
`;

export const SIGNUP = gql`
  mutation Signup(
    $username: String!
    $password: String!
    $profileImage: String!
  ) {
    signUp(
      username: $username
      password: $password
      profileImage: $profileImage
    ) {
      token
    }
  }
`;
export const GET_USER = gql`
  query GetUser {
    user {
      id
      username
      profileImage
    }
  }
`;
export const GET_USER_DATA = gql`
  query GetUserData {
    user {
      id
      username
      profileImage
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
    userChallenges {
      id
      type
      endDate
      startDate
      completed
    }
    friends {
      id
      username
      profileImage
      badges {
        type
        badgeImage
        createdAt
      }
    }
    allMultiPlayerChallenges {
    id
    multiPlayerChallenges {
      id
      winCondition
      completed
      name
      users {
        id
        username
        profileImage
        user_challenge {
          currentAmout
          leftChallenge
      }
    }
  }
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
