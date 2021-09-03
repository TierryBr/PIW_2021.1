import { Router } from 'express'

import userController from '../controllers/commentsController'

const routes = Router()

routes.post('/api/comentarios', userController.inserirComentario)
routes.get('/api/comentarios', userController.listarComentarios)
routes.get('/api/comentarios/:id', userController.buscarComentarioId)
routes.delete('/api/comentarios/:id', userController.deletarComentario)

export default routes
