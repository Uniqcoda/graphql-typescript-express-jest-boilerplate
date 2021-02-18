import { gql } from 'apollo-server-express';

// Construct a schema, using GraphQL schema language
// Note that placing ! beside a field makes it compulsory
export default gql`
  scalar Date

  enum Role {
    Admin
    User
  }

  type User {
    id: ID
    firstname: String
    lastname: String
    email: String
    DOB: Date
    phone: String
    createdAt: Date
    updatedAt: Date
    deletedAt: Date
    isVerified: Boolean
    token: String
  }

  type Token {
    token: String
  }

  input SignUp {
    firstname: String!
    lastname: String!
    email: String!
    password: String!
    DOB: Date
    phone: String!
  }

  type Query {
    getUsers: [User!]!
  }

  type Mutation {
    # user mutations
    signUp(input: SignUp!): User!
    login(email: String!, password: String!): Token!
  }
`;
