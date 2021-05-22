import {gql} from '@apollo/client'

export const FETCH_FRIENDS = gql`
  query FetchFriends {
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
  }
`;

export const UNFOLLOW_USER = gql`
mutation UnfollowUser($friendId: ID) {
  unfollowUser(friendId: $friendId) {
    friendId
  }
}
`;