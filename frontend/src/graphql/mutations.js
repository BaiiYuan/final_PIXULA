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

export const CREATE_IMAGE_MUTATION = gql`
  mutation createImage(
    $id: ID!
    $author: ID!
    $filename: String!
  ) {
    createImage(
      data: {
        id: $id
        author: $author
        filename: $filename
      }
    ) {
      id
    }
  }
`

export const DELETE_IMAGE_MUTATION = gql`
  mutation deleteImage(
    $id: ID!
  ) {
    deleteImage(
      id: $id
    ) {
      id
      author
      filename
    }
  }
`

export const UPDATE_IMAGE_MUTATION = gql`
  mutation updateImage(
    $id: ID!
    $filename: String
  ) {
    updateImage(
      id: $id
      data: {
        filename: $filename
      }
    ) {
      id
      filename
    }
  }
`