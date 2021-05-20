import { gql } from "@apollo/client";

export const CREATE_MULTI_PLAYER_CHALLENGE = gql`
  mutation CreateMultiplayerChallenge(
    $friendId: ID
    $name: String
    $startDate: String
    $endDate: String
    $winCondition: String
    $winAmount: Int
  ) {
    createMultiplayerChallenge(
      friendId: $friendId
      name: $name
      startDate: $startDate
      endDate: $endDate
      winCondition: $winCondition
      winAmount: $winAmount
    ) {
      id
      friendId
    }
  }
`;

export const FETCH_ALL_CHALLENGES = gql`
  query AllMultiPlayerChallenges{
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

export const FETCH_CURENT_CHALLENGES = gql`
  query CurrentMultiPlayerChallenges{
  currentMultiPlayerChallenges {
    id
    multiPlayerChallenges {
      id
      winCondition
      completed
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

export const LEAVE_CHALLENGE = gql`
  mutation LeaveChallenge($challengeId: ID) {
    leaveChallenge(challengeId: $challengeId) {
      id
    }
  }
`;
