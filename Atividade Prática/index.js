const express = require("express");
const session = require("express-session");
const nodemailer = require("nodemailer");
const app = express();
const formidavel = require('formidable')
const fs = require('fs')
const removeAccents = require('remove-accents');

const porta = 443;

var path = require("path");


app.use(session({ secret: "12134567890" }));
app.use(express.urlencoded({ extended: true }));

var login = "admin";
var password = "1234";

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.use("/public", express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "./"));

app.post("/", (req, res) => {
  if (req.body.password === password && req.body.login === login) {
    // logado com sucesso
    req.session.login = login;

    // Redirecionar para a página "logado"
    res.render("logado");

  } else {
    res.render("home");
  }
});

app.get("/", (req, res) => {
  if (req.session.login) {
      res.render("logado");
      console.log("Usuário logado: " + req.session.login);
  } else {
    res.render("home");
  }
});


app.get("/enviaremail", (req, res) => {
  if (req.session.login) {
    res.render("email", { mensagem: "" });
  } else {
    res.render("home");
  }
});

app.post("/enviaremail", async function (req, res) {
  const { email } = req.body;
  const { assunto } = req.body;
  const { texto } = req.body;
  const { anexo } = req.body;

  const form = new formidavel.IncomingForm();
    form.parse(req, async (erro, campos, files) => {
      try {
        const anexoNovo = removeAccents(files.anexo[0].originalFilename)
        const assuntoNovo = campos.assunto[0]
        const emailNovo = campos.email[0]
        const textoNovo = campos.texto[0]
        const urlAntiga = files.anexo[0].filepath
        const urlNova = './uploads/' + removeAccents(files.anexo[0].originalFilename)
        const rawData = fs.readFileSync(urlAntiga)
        fs.writeFileSync(urlNova, rawData)
        if (emailNovo) {
          const enviou = await enviarEmail(emailNovo, assuntoNovo, textoNovo, anexoNovo);
          if (enviou) {
            // Lógica após o envio do e-mail, se necessário
            res.render("email", { mensagem: "O Email foi enviado com sucesso" });
          } else {
            res.render("email", { mensagem: "Não foi possível enviar o email." });
          }
        }
      } catch (err) {
        console.error("Erro no processamento do formulário:", err);
        res.render("erro", { mensagem: "Erro no processamento do formulário." });
      }
    });
})

async function enviarEmail(emailNovo, assuntoNovo, textoNovo, anexoNovo) {
  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "fc9d2b3d573758",
      pass: "7af2c2d4d0e1e5",
    },
  });

  const mensagem = {
    from: "concursoifes@ifes.com.br",
    to: emailNovo,
    subject: assuntoNovo,
    html: `<h1>Atividade Prática Semana 4 - Módulo 2 FIC2</h1>
               <p> ${textoNovo} </p>
                <a href="cid:${anexoNovo}" download="${anexoNovo}"> Baixar anexo </a>`,
    text: "Esse é o texto da atividade prática da semana 4 em .txt",

    attachments: [
      {
        filename: anexoNovo,
        path: path.join(__dirname, "/uploads/", anexoNovo),
        cid: anexoNovo,
      },
    ],
  };

  try {
    await transport.sendMail(mensagem);
    console.log("E-mail enviado com sucesso");
    const pastaUploads = path.join(__dirname, 'uploads');
    const arquivosNaPasta = fs.readdirSync(pastaUploads);
      // Itera sobre a lista e exclui cada arquivo
      arquivosNaPasta.forEach(arquivo => {
        const caminhoCompleto = path.join(pastaUploads, arquivo);
        fs.unlinkSync(caminhoCompleto);
      });
    return true;
  } catch (err) {
    console.error("Erro ao enviar e-mail:", err);
    return false;
  }
}

app.listen(porta, () => {
  console.log("Servidor rodando");
});
