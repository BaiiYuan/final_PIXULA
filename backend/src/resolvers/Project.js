const { User } = require("./../models")

const Project = {
  author: async (parent, args) => {
  	let user = await User.findById(parent.author).exec()
  	return user
  }
}

export { Project as default }
