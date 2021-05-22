import { gql } from "@apollo/client";

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

// ***** Pending Friends ***** //

export const FETCH_PENDING_FRIENDS = gql`
  query FetchFriends {
    pendingFriends {
      id
      username
      profileImage
    }
  }
`;

export const ACCEPT_FRIEND_REQ = gql`
  mutation AcceptFriendReq($friendId: ID) {
    acceptFriendReq(friendId: $friendId) {
      friendId
    }
  }
`;
