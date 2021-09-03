import { Request, Response } from 'express'
import Post from '../models/post'
import Comment from '../models/comment'
import { renderPost, renderManyPost } from '../views/postView'
// import { renderUser, renderManyUser } from '../views/userView'

interface post {
  id: number,
  texto: string,
  likes: number,
}

export default {
  async inserirPost (req: Request, res: Response) {
    const posts: post = req.body
    Post.create(posts)
      .then(function (posts) {
        res.status(201).json(renderPost(posts))
      })
      .catch(function (error) {
        res.status(400).json({ message: 'Error ao cadastrar usuário' + error })
      })
  },

  async listarPosts (req: Request, res: Response) {
    Post.find().populate('usuario').exec()
      .then(function (posts) {
        res.status(200).json(renderManyPost(posts))
      })
      .catch(function (error) {
        res.status(500).json({ message: 'Erro ao listar usuários' + error })
      })
  },

  async buscarPostId (req: Request, res: Response) {
    const id = req.params.id
    Post.findById(id).exec()
      .then(function (posts) {
        res.status(200).json(renderPost(posts))
      })
      .catch(function (error) {
        res.status(400).json({ message: 'Erro ao buscar usuário' + error })
      })
  },

  async deletarPost (req: Request, res: Response) {
    const id = req.params.id
    Post.findByIdAndDelete(id)
      .then(function (posts) {
        res.status(200).json(renderPost(posts))
      })
      .catch(function (error) {
        res.status(404).json({ message: 'Erro ao deletar usuário' + error })
      })
  },

  async obterComentarios (req: Request, res: Response) {
    const id = req.params.id
    Comment.find({ post: id })
      .then(function (comments) {
        res.status(200).json(renderManyPost(comments))
      })
      .catch(function (error) {
        res.status(500).json({ message: 'Erro ao obter comentario' + error })
      })
  }
}
