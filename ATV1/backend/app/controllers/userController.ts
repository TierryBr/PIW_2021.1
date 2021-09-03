import { Request, Response } from 'express'

interface user {
  id: number,
  nome: string,
  email: string,
  senha: string,
}

let usuarios = [
  { id: 1, nome: 'tierry', email: 'tierry@gmail.com', senha: '123' },
  { id: 2, nome: 'lucas', email: 'lucas@gmail.com', senha: '123' },
  { id: 3, nome: 'pedro', email: 'pedro@gmail.com', senha: '123' }
]

export default {
  async inserirUsuario (req: Request, res: Response) {
    const usuario = req.body
    usuarios.push(usuario)
    res.status(201).json(usuario)
  },

  async listarUsuarios (req: Request, res: Response) {
    let users = usuarios
    if (req.query.nome) {
      const nome = req.query.nome
      users = users.filter((usuario: user) => { return usuario.nome === nome })
    }
    res.json(users)
  },

  async buscarUsuarioId (req: Request, res: Response) {
    const id = req.params.id
    const id_: number = +id // convertendo a String para Number
    const usuario = usuarios.find((usuario: user) => { return usuario.id === id_ })
    if (usuario) {
      res.json(usuario)
    } else {
      res.status(404).json({ mensagem: 'Usuario não encontrado' })
    }
  },

  async deletarUsuario (req: Request, res: Response) {
    const id = req.params.id
    const id_: number = +id // convertendo a String para Number
    usuarios = usuarios.filter((usuario: user) => { return usuario.id !== id_ })
    res.json({ mensagem: 'Usuario removido!' })
  }

}
