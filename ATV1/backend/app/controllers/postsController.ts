import { Request, Response } from 'express'

interface post {
  id: number,
  texto: string,
  likes: number,
}

let posts = [
  { id: 1, texto: 'oi, tudo bem?', likes: 6 },
  { id: 2, texto: 'tudo bom', likes: 6 },
  { id: 3, texto: 'gostei', likes: 6 }
]

export default {
  async inserirPost (req: Request, res: Response) {
    const postt = req.body
    posts.push(postt)
    res.status(201).json(postt)
  },

  async listarPosts (req: Request, res: Response) {
    let postt = posts
    if (req.query.nome) {
      const nome = req.query.nome
      postt = postt.filter((post: post) => { return post.texto === nome })
    }
    res.json(postt)
  },

  async buscarPostId (req: Request, res: Response) {
    const id = req.params.id
    const id_: number = +id // convertendo a String para Number
    const postt = posts.find((post: post) => { return post.id === id_ })
    if (postt) {
      res.json(postt)
    } else {
      res.status(404).json({ mensagem: 'Post não encontrado' })
    }
  },

  async deletarPost (req: Request, res: Response) {
    const id = req.params.id
    const id_: number = +id // convertendo a String para Number
    posts = posts.filter((post: post) => { return post.id !== id_ })
    res.json({ mensagem: 'Post removido!' })
  }
}
