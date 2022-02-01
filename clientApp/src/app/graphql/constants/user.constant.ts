import { gql } from 'apollo-angular';

export const userQuery = gql`
  query user($id: String!) {
    user(id: $id) {
      id
      createdAt
      name
    }
  }
`;

export const onCreateUserSubscription = gql`
  subscription {
    onCreateUser {
      id
      createdAt
      name
    }
  }
`;

export const createUserMutation = gql`
  mutation createConversation($user: UserInput) {
    createConversation(user: $user) {
      id
      createdAt
      name
    }
  }
`;
