const Users = require("../database/models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class authenticate {
  async login(req, res) {
    try {
      const { email } = req.body;
      const { password } = req.body;
      const user = await Users.findOne({ where: { email: email } });

      if (!user) {
        res.status(400).json({ msg: "email não cadastrado" });
        return;
      }
      const passIsCorrect = bcrypt.compareSync(password, user.password);

      if (!passIsCorrect) {
        res.status(400).json({ msg: "senha incorreta" });
        return;
      }
      const token = jwt.sign({id:user.id, email: email, nome: user.nome }, "teste123", {
        expiresIn: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 4,
      });

      res.status(200).json({ id:user.id,email: email, nome: user.nome, token: token });
    } catch (error) {
      res.status(400).json(error);
    }
  }
}

module.exports = new authenticate();
