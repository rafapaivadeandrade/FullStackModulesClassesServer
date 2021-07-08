const db = require("../database/connection");
const ApiError = require('../errors/api-error');

module.exports = {
  async create(req, res)
  {
    const trx = await db.transaction();

    try
    {
      const { name } = req.body;
      const module = await trx("modules").first("*").where({ name: name });

      if (module)
      {
        res.send({ error: "Module already exists!" });
      } else
      {
        const moduleId = await trx('modules')
          .insert({
            name: name,
          })
        await trx.commit();
        return res.status(201).json({ id: moduleId });
      }

    } catch (error)
    {
      await trx.rollback();
      throw new ApiError.badRequest(
        'Unexpected error while creating new module',
        400
      );
    }
  },
  async getModules(req, res)
  {
    const modules = await db("modules")
      .select(["modules.*"])

    return res.json(modules);
  },
  async getModule(req, res)
  {
    const { id } = req.params
    const module = await db("modules")
      .select("modules.*").where('id', id);

    return res.json(module);
  },
  async updateModule(req, res)
  {
    const updateModule = req.body
    let { id } = req.params

    const modules = await db('modules').select().where('id', id)
    if (modules.length === 0)
    {
      res.status(401)
      return res.send({ error: true })
    }

    const moduleToUpdate = {
      name: updateModule.name,
    }

    await db('modules')
      .where('id', id)
      .update(moduleToUpdate)

    res.send(moduleToUpdate)
  },
  async remove(req, res)
  {
    const { user } = res.locals
    const { id } = req.params
    const module = await db('modules').select().where('id', id)

    if ((module.length === 0))
    {
      res.status(401)
      res.send({ error: true })
    } else
    {
      await db('modules').select().where('id', id).del()
      res.send({ success: true })
    }
  }

};
