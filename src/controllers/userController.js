const db = require("../database/connection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.json");

function generateToken(params = {})
{
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400,
  });
}

module.exports = {
  async auth(req, res)
  {
    try
    {
      const { email, password } = req.body;
      const user = await db("users").first("*").where({ email: email });
      if (user)
      {
        const validPass = await bcrypt.compare(password, user.password);
        if (validPass)
        {
          user.password = undefined;
          res.send({
            user: user,
            token: generateToken({ id: user.id }),
          });
        } else
        {
          res.send({ error: "Wrong password" });
        }
      } else
      {
        res.send({ error: "User not found!" });
      }
    } catch (e)
    {
      res.send({ error: "Cannot login" });
    }
  },
  // async totalTeachers(req, res) {
  //   const [count] = await db("users").count();

  //   return res.send({ count: count["count(*)"] });
  // },
};
