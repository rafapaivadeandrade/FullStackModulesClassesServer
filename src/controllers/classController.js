const db = require("../database/connection");
const ApiError = require('../errors/api-error');

module.exports = {
  async create(req, res)
  {
    const trx = await db.transaction();

    try
    {
      const { name, date } = req.body;
      const { id } = req.params;
      const classes = await trx("classes").first("*").where({ name: name });

      if (classes)
      {
        res.send({ error: "Class already exists!" });
      } else
      {
        const classesId = await trx('classes')
          .insert({
            name: name,
            created: date,
            module_id: id
          })
        await trx.commit();

        return res.status(201).json({ id: classesId });
      }

    } catch (error)
    {
      await trx.rollback();
      throw new ApiError.badRequest(
        'Unexpected error while creating new class',
        400
      );
    }
  },
  async getClasses(req, res)
  {
    const { id } = req.params
    const classes = await db("classes")
      .where("module_id", id)
      .select(["classes.*"]).orderBy('name', 'asc')

    return res.json(classes);
  },
  async getTotal(req, res)
  {
    const [count] = await db("classes").count();

    return res.send({ count: count["count(*)"] });
  },
  async getClass(req, res)
  {
    const { id } = req.params
    const classes = await db("classes")
      .select("classes.*").where('id', id);


    return res.json(classes);
  },
  async update(req, res)
  {
    const updateClass = req.body
    let { id } = req.params

    const classes = await db('classes').select().where('id', id)
    if (classes.length === 0)
    {
      res.status(401)
      return res.send({ error: true })
    }

    const classToUpdate = {
      name: updateClass.name,
      created: updateClass.date,
      module_id: updateClass.moduleId,
    }

    await db('classes')
      .where('id', id)
      .update(classToUpdate)

    res.send(classToUpdate)
  },
  async remove(req, res)
  {
    const { id } = req.params
    const classes = await db('classes').select().where('id', id)

    if ((classes.length === 0))
    {
      res.status(401)
      res.send({ error: true })
    } else
    {
      await db('classes').select().where('id', id).del()
      res.send({ success: true })
    }
  }
  // async totalTeachers(req, res) {
  //   const [count] = await db("users").count();

  //   return res.send({ count: count["count(*)"] });
  // },
};
