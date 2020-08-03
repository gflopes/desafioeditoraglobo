const { check, validationResult } = require('express-validator')

const validateNoticia = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(400).json({
    errors: extractedErrors
  })
}

const addNoticiaValidationRules = () => {
  return [
    check('titulo')
      .not()
      .isEmpty()
      .withMessage('Informe o título da notícia')
      .isLength({ max: 100 })
      .withMessage('Informe o título da notícia com no máximo 100 caracteres'),
    check('conteudo')
      .not()
      .isEmpty()
      .withMessage('Informe o conteúdo da notícia')
      .isLength({ max: 1000 })
      .withMessage('Informe o conteúdo da notícia com no máximo 1000 caracteres'),
    check('dataPublicacao')
      .not()
      .isEmpty()
      .withMessage('Informe a data de publicação da notícia')
  ]
}

module.exports = {
  addNoticiaValidationRules,
  validateNoticia
}
