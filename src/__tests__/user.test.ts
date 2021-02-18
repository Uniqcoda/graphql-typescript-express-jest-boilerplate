import { graphqlTestCall, teardown } from '../test-setup';
import UserModel from '../models/User';

beforeAll(async () => {
  // create a user
  const user = {
    firstname: 'Ada',
    lastname: 'Okoro',
    email: 'ada@mail.com',
    password: 'ada',
    phone: '0806759315',
  };

  const testUser = new UserModel(user);
  await testUser.save();
});

afterAll(async () => {
  await teardown();
});

const signUpMutation = `
mutation SignUpMutation(
  $input: SignUp!
) {
  signUp(
    input: $input
  ) {
    id
    firstname
    lastname
    email
    phone
    isVerified
    createdAt
    updatedAt
    DOB
    token
  }
}
`;

const loginMutation = `
mutation LoginMutation($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
  }
}
`;

const getUsersQuery = `
  query GetUsersQuery {
    getUsers {
      id
      firstname
      lastname
      email
      phone
      isVerified
      createdAt
      updatedAt
      DOB
      token
    }
  }
`;

describe('User resolvers', () => {
  test('test getUsers', async () => {
    const response = await graphqlTestCall(getUsersQuery, {});
    expect(response.data?.getUsers.length).toBe(1);
  });

  test('test sign up', async () => {
    const newUser = {
      firstname: 'Ade',
      lastname: 'Baba',
      email: 'ade@mail.com',
      password: 'ade',
      phone: '8067579313',
    };
    const response = await graphqlTestCall(signUpMutation, { input: newUser });

    expect(response).toMatchObject({
      data: {
        signUp: {
          firstname: 'Ade',
          lastname: 'Baba',
          email: 'ade@mail.com',
        },
      },
    });
    expect(response.data!.signUp).toHaveProperty('token');
  });

  test('test unsuccessful sign up with already existing email', async () => {
    const newUser = {
      firstname: 'Ade',
      lastname: 'Baba',
      email: 'ada@mail.com',
      password: 'ade',
      phone: '8067579313',
    };
    const response = await graphqlTestCall(signUpMutation, { input: newUser });

    const errors: any = response.errors;
    expect(errors[0].message).toContain('Email already in use');
  });

  test('test successful login', async () => {
    const response = await graphqlTestCall(loginMutation, {
      email: 'ada@mail.com',
      password: 'ada',
    });
    expect(response.data!.login).toHaveProperty('token');
  });

  test('test unsuccessful login with wrong email', async () => {
    const response = await graphqlTestCall(loginMutation, {
      email: 'paul@mail.com',
      password: 'paul',
    });
    const errors: any = response.errors;
    expect(errors[0].message).toBe('Wrong email or password');
  });

  test('test unsuccessful login with wrong password', async () => {
    const response = await graphqlTestCall(loginMutation, {
      email: 'ada@mail.com',
      password: 'paul',
    });
    const errors: any = response.errors;
    expect(errors[0].message).toBe('Wrong email or password');
  });
});
