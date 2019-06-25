import uuidv4 from 'uuid/v4'

const { User, Project } = require('./../models');

const Mutation = {
  createUser: async (parent, args, { db }, info) => {
    let u = await User.find({account: args.data.account}).exec()
    if (u.length > 0) {
      return {id: 'accountTaken', account: '', password: ''}
    }
    
    let user = await User.create(args.data)

    return user
  },
  deleteUser: async (parent, args, { db }, info) => {
    let user = await User.findByIdAndDelete(args.id).exec()
    return user
  },
  updateUser: async (parent, args, { db }, info) => {
    const { id, password } = args
    let user = await User.findById(args.id).exec()
    
    if (!user) throw new Error('user not found')

    user.password = password
    await user.save()

    return user
  },
  createProject: async (parent, args, { db, pubsub }, info) => {
    const { author, title } = args.data

    let u = await User.findById(author).exec()
    if (!u) throw new Error('user not found')

    const data_args = {
      blur: 0,
      brightness: 1,
      contrast: 1,
      grayscale: 0,
      hue_rotate: 0,
      invert: 0,
      opacity: 1,
      saturate: 1,
      sepia: 0,
      public: false,
      ...args.data
    }
    let project = await Project.create(data_args)

    console.log(project)

    return project
  },
  copyProject: async (parent, args, { db, pubsub }, info) => {
    const { author, title } = args.data

    let project = await Project.create({public: false, ...args.data})

    return project
  },
  deleteProject: async (parent, args, { db, pubsub }, info) => {
    let project = await Project.findByIdAndDelete(args.id).exec()
    return project
  },
  updateProject: async (parent, args, { db, pubsub }, info) => {
    const { id, data } = args

    let project = await Project.findById(id).exec()

    if (!project)
      throw new Error('project not found')

    project.title = data.title
    project.description = data.description
    project.imageTransfer = data.imageTransfer
    project.imageFinal = data.imageFinal
    project.blur = data.blur
    project.brightness = data.brightness
    project.contrast = data.contrast
    project.grayscale = data.grayscale
    project.hue_rotate = data.hue_rotate
    project.invert = data.invert
    project.opacity = data.opacity
    project.saturate = data.saturate
    project.sepia = data.sepia
    project.public = data.public
    project.date = data.date

    await project.save()

    return project
  }
}

export { Mutation as default }
