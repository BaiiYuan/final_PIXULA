import React from 'react'
import Post from '../components/Post/Post'

import { Query } from 'react-apollo'

import {
  POSTS_QUERY
} from '../graphql'

import '../styles.css'


class Author extends React.Component {
	state = {
		fold: true
	}

	render() {
		return (
			<div>
				<div onClick={e => this.setState((state, props) => ({fold: !state.fold}))} className="author"><b>{this.props.name}</b>,  posts: {this.props.posts.length}</div>
				<div>
					{this.props.posts.map((title, key) => {
						if (!this.state.fold) {
							return (
								<Query query={POSTS_QUERY} variables={{ query:title }}>
						          {({ loading, error, data, subscribeToMore }) => {
						            if (loading) return <p>Loading...</p>
						            if (error) return <p>Error :(((</p>

						            // console.log(data)
						            if (data.posts[0] !== undefined)
						            	return <Post data={data.posts[0]} key={key} />
						            return <div></div>
						          }}
						        </Query>
						    )}
						 return <div></div>
				    }
					)}
				</div>
			</div>
		)
	}
}

export default Author