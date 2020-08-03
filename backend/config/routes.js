const express = require('express')
const {
  loginValidationRules,
  signupValidationRules,
  validateUsuario,
} = require('../util/validatorUsuarioInput.js')

const {
  addNoticiaValidationRules,
  validateNoticia,
} = require('../util/validatorNoticiaInput.js')

const jwtValidate = require('../util/jwtValidate')

module.exports = function(server) {
  const api = express.Router()
  server.use('/api', api)

  const UsuarioService = require('../api/usuario/usuarioService')
  const NoticiaService = require('../api/noticia/noticiaService')

  api.post(
    '/login',
    loginValidationRules(),
    validateUsuario,
    UsuarioService.login
  )

  api.post(
    '/signup',
    signupValidationRules(),
    validateUsuario,
    UsuarioService.signup
  )

  api.post(
    '/noticias',
    addNoticiaValidationRules(),
    validateNoticia,
    NoticiaService.add
  )

  api.put(
    '/noticias/:id',
    addNoticiaValidationRules(),
    validateNoticia,
    NoticiaService.update
  )

  api.get('/noticias/:id', NoticiaService.findById)
  
  api.get('/noticias', NoticiaService.list)
  
  api.delete(
    '/noticias/:id',
    NoticiaService.deleteNoticia
  )
}
