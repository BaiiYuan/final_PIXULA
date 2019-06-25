const { User, Project } = require('./../models');

const Query = {
  users: async (parent, args, { db }, info) => {

    if (args.id) {
      let user = await User.findById(args.id).exec()
      return user
    }

    if (!args.account && !args.password) {
      let users = await User.find({}).exec()
      return users
    }

    let user = await User.find({account: args.account, password: args.password}).exec()
    return user
  },
  projects: async (parent, args, { db }, info) => {

    let projects = await Project.find({author: args.author}).exec()
    return projects
  },
  project: async (parent, args, { db }, info) => {
    let project = await Project.findById(args.id).exec()
    return project
  },
  projects_public: async (parent, args, { db }, info) => {
    let projects = await Project.find({public: true}).exec()
    return projects
  }
}

export { Query as default }
