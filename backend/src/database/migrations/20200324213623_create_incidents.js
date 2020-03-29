
exports.up = function (knex) {
  return knex.schema.createTable('incidents', function (table) {
    table.increments(); //id será auto incremental (primary key)
    table.string('title').notNullable();
    table.string('description').notNullable();
    table.decimal('value').notNullable();
    table.string('ong_id').notNullable();//valor de referencia a ong 
    table.foreign('ong_id').references('id').inTable('ong_id');
  });
};
exports.down = function (knex) {
  return knex.schema.dropTable('incidents');
};
