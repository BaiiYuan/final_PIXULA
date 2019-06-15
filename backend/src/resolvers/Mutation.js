import uuidv4 from 'uuid/v4'

const Mutation = {
  createUser(parent, args, { db }, info) {
    const accountTaken = db.users.some(user => user.account === args.data.account)

    if (accountTaken) {
      throw new Error('Account taken')
    }

    const user = {
      id: uuidv4(),
      ...args.data
    }

    db.users.push(user)

    return user
  },
  deleteUser(parent, args, { db }, info) {
    const userIndex = db.users.findIndex(user => user.id === args.id)

    if (userIndex === -1) {
      throw new Error('User not found')
    }

    const deletedUsers = db.users.splice(userIndex, 1)

    db.projects = db.projects.filter(project => project.author !== args.id)

    return deletedUsers[0]
  },
  updateUser(parent, args, { db }, info) {
    const { id, password } = args
    const user = db.users.find(user => user.id === id)

    if (!user) {
      throw new Error('User not found')
    }

    if (typeof password !== 'string') {
      user.password = password
    }

    return user
  },
  createProject(parent, args, { db, pubsub }, info) {
    const { author, title } = args.data
    const userExists = db.users.some(user => user.id === author)

    if (!userExists) {
      throw new Error('User not found')
    }

    const titleTaken = db.projects.some(project => project.title === title && project.author === author)

    if (titleTaken) {
      throw new Error('Filename has been used')
    }

    const project = {
      id: uuidv4(),
      ...args.data
    }

    db.projects.push(project)

    pubsub.publish(`project ${project.author}`, {
      project: {
        mutation: 'CREATED',
        data: project
      }
    })

    return project
  },
  deleteProject(parent, args, { db, pubsub }, info) {
    const projectIndex = db.projects.findIndex(project => project.id === args.id)

    if (projectIndex === -1) {
      throw new Error('Project not found')
    }

    const [project] = db.projects.splice(projectIndex, 1)

    pubsub.publish(`project ${project.author}`, {
      project: {
        mutation: 'DELETED',
        data: project
      }
    })

    return project
  },
  updateProject(parent, args, { db, pubsub }, info) {
    const { id, data } = args
    const project = db.projects.find(project => project.id === id)

    if (!project) {
      throw new Error('project not found')
    }

    project.id = data.id

    if (data.title) {
      project.title = data.title
    }

    if (data.description) {
      project.description = data.description
    }

    pubsub.publish(`project ${project.author}`, {
      project: {
        mutation: 'UPDATED',
        data: project
      }
    })

    return project
  }
}

export { Mutation as default }
