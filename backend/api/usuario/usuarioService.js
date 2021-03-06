const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Usuario = require('../../model/usuario')
const env = require('../../.env')

const emailRegex = /\S+@\S+\.\S+/

const sendErrorsFromDB = (res, dbErrors) => {
  const mensagem = []
  _.forIn(dbErrors.errors, error => mensagem.push(error.message))
  return res.status(400).json({
    mensagem
  })
}

async function update(usuario) {
  usuario.data_ultimo_login = new Date()
  await usuario.save(function(err) {
    if (!err) {
      return true
    }
  })
}

async function login(req, res) {
  const email = req.body.email || ''
  const senha = req.body.senha || ''

  Usuario.findOne(
    {
      email
    },
    (err, usuario) => {
      if (err) {
        return sendErrorsFromDB(res, err)
      } else if (usuario) {
        if (bcrypt.compareSync(senha, usuario.senha)) {
          const { email } = usuario

          const token = jwt.sign(
            {
              email: email
            },
            env.authSecret,
            {
              expiresIn: 604800
            }
          )

          if (update(usuario)) {
            return res.status(200).json({
              email,
              token
            })
          } else {
            return res.status(500).json({
              mensagem:
                'Erro na atualização da data de último login do usuário'
            })
          }
        } else {
          return res.status(401).json({
            mensagem: 'Usuário e/ou Senha inválidos'
          })
        }
      } else {
        return res.status(404).json({
          mensagem: 'Usuário e/ou Senha inválidos'
        })
      }
    }
  )
}

const signup = (req, res) => {
  const email = req.body.email || ''
  const nome = req.body.nome || ''
  const senha = req.body.senha || ''

  if (!email.match(emailRegex)) {
    return res.status(400).json({
      mensagem: 'O e-mail informado está inválido'
    })
  }

  const salt = bcrypt.genSaltSync()
  const senhaHash = bcrypt.hashSync(senha, salt)

  Usuario.findOne(
    {
      email
    },
    (err, usuario) => {
      if (err) {
        return sendErrorsFromDB(res, err)
      } else if (usuario) {
        return res.status(400).json({
          mensagem: 'Email já existente.'
        })
      } else {
        const newUser = new Usuario({
          email,
          nome,
          senha: senhaHash
        })
        newUser.save(err => {
          if (err) {
            return sendErrorsFromDB(res, err)
          } else {
            return res.status(201).json({
              mensagem: 'Usuário cadastrado com sucesso'
            })
          }
        })
      }
    }
  )
}

module.exports = {
  login,
  signup
}
