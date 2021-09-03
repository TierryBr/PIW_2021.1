import { Request, Response } from 'express'
import Comment from '../models/comment'
import { renderComment, renderManyComment } from '../views/commentView'

interface comment {
  id: number,
  texto: string,
  post: string,
  usuario: string
}

export default {
  async inserirComentario (req: Request, res: Response) {
    const comments: comment = req.body
    Comment.create(comments)
      .then(function (comments) {
        res.status(201).json(renderComment(comments))
      })
      .catch(function (error) {
        res.status(400).json({ message: 'Error ao inserir comentario' + error })
      })
  },

  async listarComentarios (req: Request, res: Response) {
    Comment.find().populate('usuario').exec()
      .then(function (comments) {
        res.status(200).json(renderManyComment(comments))
      })
      .catch(function (error) {
        res.status(500).json({ message: 'Erro ao listar comentarios' + error })
      })
  },

  async buscarComentarioId (req: Request, res: Response) {
    const id = req.params.id
    Comment.findById(id).exec()
      .then(function (comments) {
        res.status(200).json(renderComment(comments))
      })
      .catch(function (error) {
        res.status(400).json({ message: 'Erro ao buscar comentario' + error })
      })
  },

  async deletarComentario (req: Request, res: Response) {
    const id = req.params.id
    Comment.findByIdAndDelete(id)
      .then(function (comments) {
        res.status(200).json(renderComment(comments))
      })
      .catch(function (error) {
        res.status(404).json({ message: 'Erro ao deletar comentario' + error })
      })
  }
}
