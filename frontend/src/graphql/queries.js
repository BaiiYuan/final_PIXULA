import { gql } from 'apollo-boost'

export const IMAGES_QUERY = gql`
  query Image($author: ID!) {
    images(author: $author) {
      id
      filename
    }
  }
`

export const LOGIN_QUERY = gql`
  query User($account: String!, $password: String!){
    users(account: $account, password: $password) {
      id
    }
  }
`
