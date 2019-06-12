const User = {
  images(parent, args, { db }, info) {
    return db.images.filter(image => {
      return image.author === parent.id
    })
  }
}

export { User as default }
