import React, { Component } from 'react'
import { Query, Mutation } from 'react-apollo'
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from 'reactstrap'

import {
  POSTS_QUERY,
  USERS_QUERY,
  AUTHORS_QUERY,
  CREATE_POST_MUTATION,
  POSTS_SUBSCRIPTION,
} from '../../graphql'

import Author from '../../containers/Author'
import Post from '../../components/Post/Post'
import classes from './App.module.css'

let unsubscribe = null

class App extends Component {
  state = {
    formTitle: '',
    formBody: '',
    authorId: 1
  }

  handleFormSubmit = e => {
    e.preventDefault()

    const { formTitle, formBody, authorId } = this.state

    if (!formTitle || !formBody) return
    this.createPost({
      variables: {
        title: formTitle,
        body: formBody,
        published: true,
        authorId: authorId
      }
    })

    this.setState({
      formTitle: '',
      formBody: ''
    })
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <h1 className={classes.title}>Modern GraphQL Tutorial</h1>
          </Col>
        </Row>
        <Row>
          <Col xs="6" className={classes.form}>
            <Mutation mutation={CREATE_POST_MUTATION}>
              {createPost => {
                this.createPost = createPost

                return (
                  <Form onSubmit={this.handleFormSubmit}>
                    <FormGroup row>
                      <Label for="title" sm={2}>
                        Author
                      </Label>
                      <Query query={USERS_QUERY}>
                        {({ loading, error, data, subscribeToMore }) => {
                          if (loading) return <select></select>
                          if (error) return <select></select>

                          const users = data.users.map((user, id) => (
                            <option value={id + 1}>{user.name}</option>
                          ))

                          return <Col sm={10}><select onChange={e => 
                              this.setState({authorId: e.target.options[e.target.selectedIndex].value})
                          }>{users}</select></Col>
                        }}
                      </Query>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="title" sm={2}>
                        Title
                      </Label>
                      <Col sm={10}>
                        <Input
                          name="title"
                          value={this.state.formTitle}
                          id="title"
                          placeholder="Post title..."
                          onChange={e =>
                            this.setState({ formTitle: e.target.value })
                          }
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup>
                      <Label for="body">Body</Label>
                      <Input
                        type="textarea"
                        name="body"
                        value={this.state.formBody}
                        id="body"
                        placeholder="Post body..."
                        onChange={e =>
                          this.setState({ formBody: e.target.value })
                        }
                      />
                    </FormGroup>
                    <Button type="submit" color="primary">
                      Post!
                    </Button>
                  </Form>
                )
              }}
            </Mutation>
          </Col>
          <Col xs="6">
            <Query query={AUTHORS_QUERY}>
              {({ loading, error, data, subscribeToMore }) => {
                if (loading) return <p>Loading...</p>
                if (error) return <p>Error :(((</p>

                let a = {}
                for (let post of data.posts) {
                  if (a[post.author.name] === undefined)
                    a[post.author.name] = [post.title]
                  else
                    a[post.author.name].push(post.title)
                }

                const authors = Object.keys(a).map((name, id) => 
                  <Author name={name} posts={a[name]} />
                )

                if (!unsubscribe)
                  unsubscribe = subscribeToMore({
                    document: POSTS_SUBSCRIPTION,
                    updateQuery: (prev, { subscriptionData }) => {
                      if (!subscriptionData.data) return prev
                      const newPost = subscriptionData.data.post.data

                      return {
                        ...prev,
                        posts: [newPost, ...prev.posts]
                      }
                    }
                  })

                return <div>{authors}</div>
                // return <div></div>
              }}
            </Query>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default App
