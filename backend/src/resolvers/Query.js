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
  },
  project(parent, args, { db }, info) {
    return db.projects.find(project => {
      return project.id === args.id
    })
  },
  project_id(parent, args, { db }, info) {
    console.log(args)
    return db.projects.find(project => {
      return project.author === args.author && project.title === args.title
    })
  },
  projects_public(parent, args, { db }, info) {
    return db.projects.filter(project => {
      return project.public === true
    })
  }
}

export { Query as default }
