import { gql } from 'apollo-boost'

export const POSTS_QUERY = gql`
  query Post($query: String!) {
    posts(query: $query) {
      title
      body
      author {
        name
      }
      published
    }
  }
`

export const AUTHORS_QUERY = gql`
  query {
    posts {
      title
      author {
        name
      }
    }
  }
`

export const USERS_QUERY = gql`
  query {
    users {
      name
    }
  }
`
