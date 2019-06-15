import { gql } from 'apollo-boost'

export const PROJECTS_QUERY = gql`
  query Project($author: ID!) {
    projects(author: $author) {
      id
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
export const PROJECT_INFO_QUERY = gql`
  query Project($id: ID!) {
    project(id: $id) {
      id
      title
      description
      image_id
      blur
      brightness
      contrast
      grayscale
      hue_rotate
      invert
      opacity
      saturate
      sepia
    }
  }
`

export const PROJECT_ID_QUERY = gql`
  query Project_id($author: ID!, $title: String!) {
    project_id(author: $author, title: $title) {
      id
    }
  }
`