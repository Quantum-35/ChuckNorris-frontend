import gql from 'graphql-tag';

export const JOKES = gql`
    query jokes {
        jokes {
            icon_url
            id
            value
            categories
        }
    }
`;

export const CATEGORY_JOKES = gql`
    query categoryJokes($category: String) {
        categoryJokes(category: $category) {
            created_at
            icon_url
            id
            value
            categories
        }
    }
`;

export const CATEGORIES = gql`
    query categories {
        categories
    }
`;

export const GET_ALL_USERS = gql`
    query users {
        users {
        email
        }
    }
`;

export const GET_ONE_USERS = gql`
    query user($email: String) {
        user(email: $email) {
                email
        }
    }
`;
