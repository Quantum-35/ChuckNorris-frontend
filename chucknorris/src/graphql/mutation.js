import gql from 'graphql-tag';

export const SIGN_UP = gql`
    mutation sinup($data: CreateUserInput!){
        createUser(data: $data) {
            email
        }
    }
`;

export const LOGIN = gql`
    mutation signin($data: SignInInput!){
        signIn(data: $data) {
            email
            token
        }
    }
`;