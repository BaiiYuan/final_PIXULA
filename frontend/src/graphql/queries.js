import { gql } from 'apollo-boost'

export const PROJECTS_QUERY = gql`
  query Project($author: ID!) {
    projects(author: $author) {
      title
      description
      image_id
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
