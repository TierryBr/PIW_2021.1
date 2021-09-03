"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const usuarios = [
    { id: 1, nome: 'tierry', email: 'tierry@gmail.com', senha: '123' },
    { id: 2, nome: 'lucas', email: 'lucas@gmail.com', senha: '123' },
    { id: 3, nome: 'pedro', email: 'pedro@gmail.com', senha: '123' }
];
exports.default = {
    async inserirUsuario(req, res) {
        const usuario = req.body;
        usuarios.push(usuario);
        res.status(201).json(usuario);
    },
    async listarUsuarios(req, res) {
        let users = usuarios;
        if (req.query.nome) {
            const nome = req.query.nome;
            users = users.filter((usuario) => { return usuario.nome === nome; });
        }
        res.json(users);
    },
    async buscarUsuarioId(req, res) {
        const id = req.params.id;
        const id_ = +id;
        const usuario = usuarios.find((usuario) => { return usuario.id === id_; });
        if (usuario) {
            res.json(usuario);
        }
        else {
            res.status(404).json({ mensagem: 'Usuario não encontrado' });
        }
    },
    async deletarUsuario(req, res) {
        const id = req.params.id;
        const id_ = +id;
        usuarios.filter((usuario) => { return usuario.id !== id_; });
        res.json({ mensagem: 'Usuario removido!' });
    }
};
