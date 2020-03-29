const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
  //retorna todas as ongs cadastradas
  async index(req, res) {
    const ongs = await connection('ongs').select('*');
    return res.json({ ongs });
  },

  //criar novas ongs na tabela
  //no futuro criar verificação para que a mesma ong nao insira os dados 2x
  async create(req, res) {
    const { name, email, whatsapp, city, uf } = req.body;
    const id = crypto.randomBytes(4).toString('HEX');

    await connection('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf,
    });

    return res.json({ id });
  }
}