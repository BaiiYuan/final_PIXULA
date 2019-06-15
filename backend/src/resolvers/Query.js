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
  projects(parent, args, { db }, info) {
    return db.projects.filter(project => {
      return project.author === args.author
    })
  }
}

export { Query as default }
