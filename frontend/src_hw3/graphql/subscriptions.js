import { gql } from 'apollo-boost'

export const POSTS_SUBSCRIPTION = gql`
  subscription {
    post {
      mutation
      data {
        title
        author {
          name
        }
      }
    }
  }
`
