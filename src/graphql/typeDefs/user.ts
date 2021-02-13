import { gql } from 'apollo-server-express';

// Construct a schema, using GraphQL schema language
// Note that placing ! beside a field makes it compulsory
export default gql`
  scalar Date

  enum Role {
    Admin
    User
  }

  enum Gender {
    Female
    Male
  }

  type User {
    id: ID
    firstname: String
    lastname: String
    email: String
    role: Role
    dob: Date
    gender: Gender
    phonePrefix: String
    phone: String
    createdAt: Date
    updatedAt: Date
    deletedAt: Date
    avatarURL: String
    token: String
    isVerified: Boolean
  }

  input SignUp {
    firstname: String!
    lastname: String!
    email: String!
    role: Role!
    password: String!
    dob: Date
    gender: Gender
    phonePrefix: String!
    phone: String!
  }

  type Query {
    getUsers: [User!]!
  }

  type Mutation {
    # user mutations
    signUp(input: SignUp!): User!
    login(email: String!, password: String!): User!
  }
`;
