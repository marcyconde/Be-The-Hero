//criar tabela
exports.up = function (knex) {
  return knex.schema.createTable('ongs', function (table) {
    table.string('id').primary();// primary key
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('whatsapp').notNullable();
    table.string('city').notNullable();
    table.string('uf', 2).notNullable(); //Estado será cadastrado apenas com sigla, então ja impõe que serão 2 caracteres
  });
};
//deletar tabela
exports.down = function (knex) {
  return knex.schema.dropTable('ongs');
};
