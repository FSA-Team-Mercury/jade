import { gql } from "@apollo/client";

export const ADD_CHALLENGE = gql`
  mutation AddChallenge($type: String, $startDate: String, $endDate: String) {
    addChallenge(
      type: $type
      startDate: $startDate
      endDate: $endDate
    ) {
      id
      type
      startDate
      endDate
    }
  }
`;