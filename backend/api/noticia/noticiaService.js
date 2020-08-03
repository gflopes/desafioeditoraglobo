const Noticia = require('../../model/noticia')

var moment = require('moment')

Noticia.methods(['get', 'post', 'put', 'delete'])

const add = (req, res) => {
  const titulo = req.body.titulo || ''
  const conteudo = req.body.conteudo || ''
  const dataPublicacao = req.body.dataPublicacao || ''

  Noticia.findOne(
    {
      titulo
    },
    function(err, noticia) {
      if (err) {
        res.status(500).json({
          mensagem: 'Erro ao adicionar uma notícia'
        })
      } else if (noticia) {
        return res.status(400).json({
          mensagem: 'Notícia já cadastrada.'
        })
      } else {
        const newNoticia = new Noticia({
          titulo,
          conteudo,
          dataPublicacao
        })
        newNoticia.save(function(err, noticia) {
          if (err) {
            res.status(500).json({
              mensagem: err
            })
          } else {
            return res.status(201).json({
              _id: noticia._id,
              mensagem: 'Notícia cadastrada com sucesso.'
            })
          }
        })
      }
    }
  )
}

const update = (req, res) => {
  Noticia.findById(req.params.id, async function(err, noticia) {
    if (err) {
      return res.status(500).json({
        mensagem: 'Erro ao localizar a notícia'
      })
    }

    if (!noticia) {
      return res.status(404).json({
        mensagem: 'Notícia não encontrada'
      })
    }

    noticia.titulo = req.body.titulo
    noticia.conteudo = req.body.conteudo
    noticia.dataPublicacao = req.body.dataPublicacao

    noticia.save(function(err) {
      if (err) {
        res.status(500).json({
          mensagem: err,
        })
      } else {
        return res.status(200).json({
          mensagem: 'Notícia alterada com sucesso.'
        })
      }
    })
  })
}

const findById = (req, res) => {
  Noticia.findById(req.params.id, async function(err, noticia) {
    if (err) {
      return res.status(500).json({
        mensagem: 'Erro ao localizar a notícia'
      })
    }

    if (!noticia) {
      return res.status(404).json({
        mensagem: 'Notícia não encontrada'
      })
    }

    var { _id, titulo, conteudo, dataPublicacao } = noticia
    dataPublicacao = moment(dataPublicacao).format('YYYY-MM-DD')
    return res.status(200).json({_id, titulo, conteudo, dataPublicacao})
  })
}

const deleteNoticia = (req, res) => {
  try {
    Noticia.findByIdAndDelete(req.params.id, function(err) {
      if (err) {
        return res.status(404).json({
          mensagem: 'Notícia não encontrada'
        })
      }

      return res.status(204).send()
    })
  } catch (err) {
    return res.status(500).json({
      mensagem: 'Erro ao excluir a notícia: ' + err
    })
  }
}

const list = async (req, res) => {
  try {
    let result = {}

    const options = {
      sort: {
        nome: 'asc'
      },
      select: '_id titulo conteudo dataPublicacao',
      lean: true,
      leanWithId: false
    }

    const list = await Noticia.paginate({}, options)

    result = {
      noticias: []
    }

    for (const noticia of list.docs) {
      noticia.dataPublicacao = moment(noticia.dataPublicacao).format('DD/MM/YYYY')
      await result.noticias.push(noticia);
    }

    res.status(200).json(result)

  } catch (err) {
    return res.status(500).json({
      mensagem: 'Erro ao listar as notícias cadastradas: ' + err
    })
  }
}

module.exports = {
  add,
  update,
  findById,
  list,
  deleteNoticia
}
