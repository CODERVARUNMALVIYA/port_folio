import Project from '../models/Project.js'

export const getAll = async (req, res, next) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 })
    res.json(projects)
  } catch (err) {
    next(err)
  }
}

export const getOne = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id)
    if (!project) return res.status(404).json({ message: 'Not found' })
    res.json(project)
  } catch (err) {
    next(err)
  }
}

export const create = async (req, res, next) => {
  try {
    const p = new Project(req.body)
    const saved = await p.save()
    res.status(201).json(saved)
  } catch (err) {
    next(err)
  }
}

export const update = async (req, res, next) => {
  try {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!updated) return res.status(404).json({ message: 'Not found' })
    res.json(updated)
  } catch (err) {
    next(err)
  }
}

export const remove = async (req, res, next) => {
  try {
    const removed = await Project.findByIdAndDelete(req.params.id)
    if (!removed) return res.status(404).json({ message: 'Not found' })
    res.json({ message: 'Deleted' })
  } catch (err) {
    next(err)
  }
}
