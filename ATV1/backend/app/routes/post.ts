import { Router } from 'express'

import userController from '../controllers/postsController'

const routes = Router()

routes.post('/api/posts', userController.inserirPost)
routes.get('/api/posts', userController.listarPosts)
routes.get('/api/posts/:id', userController.buscarPostId)
routes.delete('/api/posts/:id', userController.deletarPost)

export default routes
