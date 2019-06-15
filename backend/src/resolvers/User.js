const User = {
  projects(parent, args, { db }, info) {
    return db.projects.filter(project => {
      return project.author === parent.id
    })
  }
}

export { User as default }
