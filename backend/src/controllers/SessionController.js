const connection = require('../database/connection');

module.exports = {
  async create(req, res) {
    const { id } = req.body; //faz uma pesquisa no corpo da requisição

    const ong = await connection('ongs')
      .where('id', id)
      .select('name')
      .first(); //retorna apenas o 1º elemento

    if (!ong) { //caso o id informado nao seja verdadeiro, ocorre o erro de Bad Request
      return res.status(400).json({ error: 'No ONG found with this ID' });
    }

    return res.json(ong);
  }

}