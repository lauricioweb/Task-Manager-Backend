const app = require("./index");

app.listen(3000, (erro) => {
  if (erro) {
    console.log(erro);
  } else {
    console.log("servidor iniciado com sucesso");
  }
});

//teste
