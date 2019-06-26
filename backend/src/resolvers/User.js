const { Project } = require("./../models")

const User = {
  projects: async (parent, args) => {
  	let projects = await Project.find({author: parent.id}).exec()
  	return projects
  }
}

export { User as default }
