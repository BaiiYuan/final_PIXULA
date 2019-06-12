const Subscription = {
  image: {
    subscribe(parent, args, { db, pubsub }, info) {
      const author = db.users.find(author => author.id === args.author)

      if (!author) {
        throw new Error('Author not found')
      }

      return pubsub.asyncIterator(`image ${args.author}`)
    }
  }
}

export { Subscription as default }
