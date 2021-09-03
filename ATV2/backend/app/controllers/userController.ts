import { Request, Response } from 'express'
import User from '../models/user'
import Post from '../models/post'
import { renderUser, renderManyUser } from '../views/userView'
import { renderManyPost } from '../views/postView'

interface user {
  id: string,
  nome: string,
  email: string,
  senha: string,
}

export default {
  async inserirUsuario (req: Request, res: Response) {
    const users: user = req.body
    User.create(users)
      .then(function (users) {
        res.status(201).json(renderUser(users))
      })
      .catch(function (error) {
        res.status(400).json({ message: 'Error ao cadastrar usuário' + error })
      })
  },

  async listarUsuarios (req: Request, res: Response) {
    User.find().populate('post').exec()
      .then(function (users) {
        res.status(200).json(renderManyUser(users))
      })
      .catch(function (error) {
        res.status(500).json({ message: 'Erro ao listar usuários' + error })
      })
  },

  async buscarUsuarioId (req: Request, res: Response) {
    const id = req.params.id
    User.findById(id).exec()
      .then(function (users) {
        res.status(200).json(renderUser(users))
      })
      .catch(function (error) {
        res.status(400).json({ message: 'Erro ao buscar usuário' + error })
      })
  },

  async deletarUsuario (req: Request, res: Response) {
    const id = req.params.id
    User.findByIdAndDelete(id)
      .then(function (users) {
        res.status(200).json(renderUser(users))
      })
      .catch(function (error) {
        res.status(404).json({ message: 'Erro ao deletar usuário' + error })
      })
  },

  async obterPosts (req: Request, res: Response) {
    const id = req.params.id
    Post.find({ usuario: id })
      .then(function (posts) {
        res.status(200).json(renderManyPost(posts))
      })
      .catch(function (error) {
        res.status(500).json({ message: 'Erro ao obter post' + error })
      })
  }

}
