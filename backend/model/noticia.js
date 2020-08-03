const restful = require('node-restful')
const mongoose = restful.mongoose
const mongoosePaginate = require('mongoose-paginate-v2')

const noticiaSchema = new mongoose.Schema({
  titulo: {
    type: String,
    max: 100,
    required: true
  },
  conteudo: {
    type: String,
    max: 1000,
    required: true
  },
  dataPublicacao: {
    type: Date,
    required: true,
    default: Date.now
  },
})

noticiaSchema.plugin(mongoosePaginate)

module.exports = restful.model('Noticia', noticiaSchema)
