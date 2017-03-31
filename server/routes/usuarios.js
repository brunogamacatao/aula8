/**
 * Este arquivo contém as rotas para o módulo de autenticação do sistema.
 * 
 * +------------+---------+----------------------------------------------------------+
 * | Verbo HTTP | URL     | Função                                                   |
 * +------------+---------+----------------------------------------------------------+
 * | POST       | /       | Registra um novo usuário                                 |
 * | POST       | /login  | Autentica um usuário                                     |
 * | GET        | /logout | Encerra a sessão de um usuário                           |
 * | GET        | /status | Retorna um objeto JSON indicado se o usuário está logado |
 * +------------+---------+----------------------------------------------------------+
 */

import express from 'express';
import passport from 'passport';
import Usuario from '../model/usuario';

let router = express.Router();

// POST / - Registra um novo usuário
router.post('/', (req, res) => {
    // Tenta registrar um novo usuário
    Usuario.register(
        new Usuario({ username: req.body.username }), // Dados do usuário
        req.body.password, // Senha
        (err, account) => { // Função callback
            if (err) { // Se ocorreu algum erro
                return res.status(500).json({err: err}); // Retorna o erro
            }

            // Se deu tudo certo, autentica o usuário
            passport.authenticate('local')(req, res, () => {
                return res.status(200).json({
                    status: 'Usuário criado com sucesso !'
                });
            });
        }
    );
});

// POST /login - Autentica um usuário na sessão
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => { // Tenta autenticar
        if (err) { // Se ocorreu algum erro
            return next(err); // Retorna o erro
        }

        if (!user) { // Se nenhum usuário foi encontrado
            // Retorna o status 401 - Unauthorized
            return res.status(401).json({ err: info});
        }

        // Cria uma sessão
        req.logIn(user, (err) => {
            if (err) { // Se houve algum erro
                return res.status(500).json({ // Retorna o erro para o usuário
                    err: 'Não foi possível autenticar o usuário'
                });
            }

            // Se deu tudo certo
            res.status(200).json({ // Envia o status 200 - Ok
                status: 'Usuário logado com sucesso !'
            });
        });
    })(req, res, next);
});

// GET /logout - Encerra a sessão de um usuário
router.get('/logout', (req, res) => {
    req.logout(); // Encerra a sessão
    res.status(200).json({ // Envia o status 200 - Ok
        status: 'Até logo!'
    });
});

// GET /status - Retorna um objeto JSON indicando se o usuário está autenticado
router.get('/status', (req, res) => {
    if (!req.isAuthenticated()) { // Se não está autenticado (ou se retornar null)
        return res.status(200).json({
            status: false // Retorna false - Não está autenticado
        });
    }
    res.status(200).json({
        status: true // Retorna true - Está autenticado
    });
});

module.exports = router;