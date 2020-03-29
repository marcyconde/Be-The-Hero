const connection = require('../database/connection');

module.exports = {
  //Listagem de todos os casos
  async index(req, res) {
    /*necessario que seja feito esquema de paginação, para que todos os registros
      nao sejam retornados de uma vez
    */
    const { page = 1 } = req.query;

    //retorna o numero total de casos cadastrados
    const [count] = await connection('incidents').count();
    console.log(count);

    res.header('X-TOTAL-COUNT', count['count(*)']);

    const incidents = await connection('incidents')
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
      .limit(5)//limitando a 5 registros por pagina
      .offset((page - 1) * 5)// colocando sempre as 5 sequentes 
      .select([
        'incidents.*',
        'ongs.name',
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf']);

    return res.json({ incidents });
  },
  //Add casos com titulo, descrição e valor
  async create(req, res) {
    const { title, description, value } = req.body;
    const ong_id = req.headers.authorization;

    const [id] = await connection('incidents').insert({
      title,
      description,
      value,
      ong_id,
    });
    return res.json({ id });
  },

  //deletar dados de casos especificos da ong logada
  async delete(req, res) {
    const { id } = req.params; //pega o id que está sendo passado na requisição
    const ong_id = req.headers.authorization; //id da ong

    const incident = await connection('incidents')
      .where('id', id)
      .select('ong_id')
      .first();

    //caso o incident.ong_id for diferente do ong_id que o cadastrou, terá um retorno de nao autorizado
    if (incident.ong_id !== ong_id) {
      return res.status(401).json({ error: 'Operation not permitted. ' });
    }
    await connection('incidents').where('id', id).delete();

    return res.status(204).send();
  }
}