"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user"));
const post_1 = __importDefault(require("../models/post"));
const userView_1 = require("../views/userView");
exports.default = {
    async inserirUsuario(req, res) {
        const users = req.body;
        user_1.default.create(users)
            .then(function (users) {
            res.status(201).json(userView_1.renderUser(users));
        })
            .catch(function (error) {
            res.status(400).json({ message: 'Error ao cadastrar usuário' + error });
        });
    },
    async listarUsuarios(req, res) {
        user_1.default.find().populate('post').exec()
            .then(function (users) {
            res.status(200).json(userView_1.renderManyUser(users));
        })
            .catch(function (error) {
            res.status(500).json({ message: 'Erro ao listar usuários' + error });
        });
    },
    async buscarUsuarioId(req, res) {
        const id = req.params.id;
        user_1.default.findById(id).exec()
            .then(function (users) {
            res.status(200).json(userView_1.renderUser(users));
        })
            .catch(function (error) {
            res.status(400).json({ message: 'Erro ao buscar usuário' + error });
        });
    },
    async deletarUsuario(req, res) {
        const id = req.params.id;
        user_1.default.findByIdAndDelete(id)
            .then(function (users) {
            res.status(200).json(userView_1.renderUser(users));
        })
            .catch(function (error) {
            res.status(404).json({ message: 'Erro ao deletar usuário' + error });
        });
    },
    async obterPosts(req, res) {
        const id = req.params.id;
        post_1.default.find({ user: id })
            .then(function (posts) {
            res.status(200).json(posts);
        })
            .catch(function (error) {
            res.status(500).json({ message: 'Erro ao obter post' + error });
        });
    }
};
