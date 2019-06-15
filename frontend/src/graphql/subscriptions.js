import { gql } from 'apollo-boost'

export const PROJECTS_SUBSCRIPTION = gql`
  subscription project($author: ID!) {
    project (author: $author) {
      mutation
      data {
        id
        filename
      }
    }
  }
`
