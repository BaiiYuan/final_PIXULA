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

    db.images = db.images.filter(image => image.author !== args.id)

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
  createImage(parent, args, { db, pubsub }, info) {
    const { author, filename } = args.data
    const userExists = db.users.some(user => user.id === author)

    if (!userExists) {
      throw new Error('User not found')
    }

    const filenameTaken = db.images.some(image => image.filename === filename && image.author === author)

    if (filenameTaken) {
      throw new Error('Filename has been used')
    }

    const image = {
      ...args.data
    }

    db.images.push(image)

    pubsub.publish(`image ${image.author}`, {
      image: {
        mutation: 'CREATED',
        data: image
      }
    })

    return image
  },
  deleteImage(parent, args, { db, pubsub }, info) {
    const imageIndex = db.images.findIndex(image => image.id === args.id)

    if (imageIndex === -1) {
      throw new Error('Image not found')
    }

    const [image] = db.images.splice(imageIndex, 1)

    pubsub.publish(`image ${image.author}`, {
      image: {
        mutation: 'DELETED',
        data: image
      }
    })

    return image
  },
  updateImage(parent, args, { db, pubsub }, info) {
    const { id, data } = args
    const image = db.images.find(image => image.id === id)

    if (!image) {
      throw new Error('image not found')
    }

    image.id = data.id

    if (data.filename) {
      image.filename = data.filename
    }

    pubsub.publish(`image ${image.author}`, {
      image: {
        mutation: 'UPDATED',
        data: image
      }
    })

    return image
  }
}

export { Mutation as default }
