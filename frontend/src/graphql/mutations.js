import { gql } from 'apollo-boost'

export const CREATE_USER_MUTATION = gql`
  mutation createUser(
    $account: String!
    $password: String!
  ) {
    createUser(
      data: {
        account: $account
        password: $password
      }
    ) {
      id
    }
  }
`

export const DELETE_USER_MUTATION = gql`
  mutation deleteUser(
    $id: ID!
  ) {
    deleteUser(
      id: $id
    ) {
      id
      account
    }
  }
`

export const UPDATE_USER_MUTATION = gql`
  mutation updateUser(
    $id: ID!
    $password: String!
  ) {
    updateUser(
      id: $id
      password: $password
    ) {
      id
      account
      password
    }
  }
`

export const CREATE_PROJECT_MUTATION = gql`
  mutation createProject(
    $author: ID!
    $title: String!
    $description: String!
    $image_id: String!
  ) {
    createProject(
      data: {
        author: $author
        title: $title
        description: $description
        image_id: $image_id
      }
    ) {
      id
      image_id
    }
  }
`

export const DELETE_PROJECT_MUTATION = gql`
  mutation deleteProject(
    $id: ID!
  ) {
    deleteProject(
      id: $id
    ) {
      id
      author
      filename
    }
  }
`

export const UPDATE_PROJECT_MUTATION = gql`
  mutation updateProject(
    $id: ID!
    $title: String!
    $description: String!
    $image_id: String!
    $blur: String!
    $brightness: String!
    $contrast: String!
    $grayscale: String!
    $hue_rotate: String!
    $invert: String!
    $opacity: String!
    $saturate: String!
    $sepia: String!
    $public: Boolean!
  ) {
    updateProject(
      id: $id
      data: {
        title: $title
        description: $description
        image_id: $image_id
        blur: $blur
        brightness: $brightness
        contrast: $contrast
        grayscale: $grayscale
        hue_rotate: $hue_rotate
        invert: $invert
        opacity: $opacity
        saturate: $saturate
        sepia: $sepia
        public: $public
      }
    ) {
      id
      image_id
    }
  }
`