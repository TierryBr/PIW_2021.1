import { Router } from 'express'

import userController from '../controllers/userController'

const routes = Router()

routes.post('/api/usuarios', userController.inserirUsuario)
routes.get('/api/usuarios', userController.listarUsuarios)
routes.get('/api/usuarios/:id', userController.buscarUsuarioId)
routes.delete('/api/usuarios/:id', userController.deletarUsuario)

export default routes
