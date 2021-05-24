import { gql } from "@apollo/client";

export const GET_BADGES = gql`
  query GetBadges {
    userBadges {
      id
      type
      badgeImage
      challengeId
    }
  }
`;