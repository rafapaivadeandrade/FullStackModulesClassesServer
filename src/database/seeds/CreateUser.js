const bcrypt = require("bcrypt");

exports.seed = async function (knex)
{
  const hash = await bcrypt.hash('test', 10);
  const hashAdmin = await bcrypt.hash('admin', 10);

  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(async function ()
    {
      // Inserts seed entries
      await knex('users').insert({
        name: 'admin',
        email: 'admin@hotmail.com',
        password: hashAdmin.toString(),
        role: 'admin',
      })
      await knex('users').insert({
        name: 'test',
        email: 'test@hotmail.com',
        password: hash.toString(),
        role: 'user',
      })
    });
};