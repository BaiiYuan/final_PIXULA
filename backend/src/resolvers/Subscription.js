const Subscription = {
  project: {
    subscribe(parent, args) {
      const author = db.users.find(author => author.id === args.author)

      if (!author) {
        throw new Error('Author not found')
      }

      return pubsub.asyncIterator(`project ${args.author}`)
    }
  }
}

export { Subscription as default }
