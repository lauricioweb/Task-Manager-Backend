const subTaskModel = require("../database/models/subtasks");

class subTaskController {
  
  // cria uma nova subtarefa
  async store(req, res) {
    try {
      const subTask = await subTaskModel.create(req.body);
      res.status(200).json(subTask);
    } catch (erro) {
      res.status(400).json(erro);
    }
  }

  // lista todas as subtarefas pelo id da tarefa

  async subTaskByTask(req, res) {
    try {
      const { id } = req.params;

      const subTaskByTask = await subTaskModel.findAll({
        where: {
          taskId: id,
        },
        order: [["createdAt", "DESC"]],
      });
      res.status(200).json(subTaskByTask);
    } catch (error) {
      res.status(404).json({ msg: "subtarefa nao encontrada" });
    }
  }

  // atualiza uma subtarefa

  async update(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({ msg: "tarefa não informada" });
        return;
      }
      const mySubTask = await subTaskModel.findByPk(id);
      const taskUpdated = await mySubTask.update(req.body);

      res.status(200).json(taskUpdated);
    } catch (erro) {
      res.status(400).json(erro);
    }
  }


   // deletando uma subtarefa

  async delete(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(401).json({ msg: "task não existe" });
      }
      const subTaksDeleted = subTaskModel.destroy({ where: { id: id } });
      res.status(200).json({"msg":"tarefa deletada com sucesso",subTaksDeleted});

    } catch (error) {
      res.status(400).json(error);
    }
  }
}

module.exports = new subTaskController();
