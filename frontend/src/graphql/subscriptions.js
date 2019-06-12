import { gql } from 'apollo-boost'

export const IMAGES_SUBSCRIPTION = gql`
  subscription image($author: ID!) {
    image (author: $author) {
      mutation
      data {
        id
        filename
      }
    }
  }
`
