const users = require("../database/models/users");
const taskModel = require("../database/models/tasks");
const validator = require("validator");
const bcrypt = require("bcryptjs");

class UserController {
  async store(req, res) {
    const { nome } = req.body;
    const { email } = req.body;
    const { password } = req.body;

    try {
      if (!nome && !email && !password) {
        res.status(500).json({ msg: "preencha todos os campos !" });
        return;
      }

      //verificando se email foi passado
      if (!email) {
        res.status(500).json({ msg: "email não informado" });
        return;
      }

      //vericando se email é valido
      if (!validator.isEmail(email)) {
        res.status(500).json({ msg: "email invalido" });
        return;
      }

      const currentUser = await users.findOne({ where: { email: email } });

      //verificando se email existe
      if (currentUser) {
        res.status(500).json({ msg: "email já está sendo usado" });
        return;
      }

      //criptografando senha
      const passwordHash = bcrypt.hashSync(password, 10);

      const newUser = await users.create({
        nome,
        email,
        password: passwordHash,
      });
      res.json(newUser);
    } catch (error) {
      res.status(400).json(error);
    }
  }

  async index(req, res) {
    try {
      const myUsers = await users.findAll({
        include: [{ model: taskModel, attributes: ["tarefa", "checked"] }],
      });
      res.json(myUsers);
    } catch (error) {
      console.log(error);
      res.status(400).json(error);
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      const { nome } = req.body;
      const { email } = req.body;
      const { password } = req.body;

      if (!id) {
        res.status(500).json({ msg: "usuario não encontrado" });
        return;
      }

      const passwordHash = bcrypt.hashSync(password, 10);

      const currentUser = await users.findByPk(id);

      const userUpdated = await currentUser.update({
        nome,
        email,
        password: passwordHash,
      });

      res.status(200).json(userUpdated);
    } catch (error) {
      res.status(400).json(error);
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    try {
      //verificando existencia do usuario
      const userExists = await users.findByPk(id);
      if (!userExists) {
        res.status(500).json({ msg: "usuario não existe" });
        return;
      }

      const deletedUser = await users.destroy({ where: { id: id } });
      res.json(deletedUser);
    } catch (error) {
      console.log(error);
      res.status;
    }
  }
}

module.exports = new UserController();
