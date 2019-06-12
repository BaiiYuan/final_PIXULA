const Query = {
  users(parent, args, { db }, info) {
    if (args.id) {
      return db.users.filter(user => {
        return user.id === args.id
      })
    }

    if (!args.account && !args.password) {
      return db.users
    }

    return db.users.filter(user => {
      return user.account === args.account && user.password === args.password
    })

  },
  images(parent, args, { db }, info) {
    if (!args.author) {
      return db.images
    }

    return db.images.filter(image => {
      return image.author === args.author
    })
  }
}

export { Query as default }
