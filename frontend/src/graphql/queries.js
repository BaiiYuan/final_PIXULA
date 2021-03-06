import { gql } from 'apollo-boost'

export const PROJECTS_QUERY = gql`
  query Project($author: ID!) {
    projects(author: $author) {
      id
      title
      description
      imageFinal
      blur
      brightness
      contrast
      grayscale
      hue_rotate
      invert
      opacity
      saturate
      sepia
      public
      date
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
export const PROJECT_INFO_QUERY = gql`
  query Project($id: ID!) {
    project(id: $id) {
      id
      account
      title
      description
      imageOriginal
      imageTransfer
      imageFinal
      blur
      brightness
      contrast
      grayscale
      hue_rotate
      invert
      opacity
      saturate
      sepia
      public
    }
  }
`

export const PUBLIC_QUERY = gql`
  query {
    projects_public {
      id
      account
      title
      description
      imageFinal
      blur
      brightness
      contrast
      grayscale
      hue_rotate
      invert
      opacity
      saturate
      sepia
      date
    }
  }
`