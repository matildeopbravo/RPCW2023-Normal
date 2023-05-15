var express = require("express");
var router = express.Router();
var axios = require("axios");

router.get("/", function (req, res, next) {
  var data = new Date().toISOString().substring(0, 16);
  axios
    .get("http://localhost:15015/contracts")
    .then((dados) => {
      res.render("index", { contratos: dados.data, d: data });
    })
    .catch((erro) => {
      res.render("error", { error: erro });
    });
});

router.get("/inst/:nipc", function (req, res, next) {
  var data = new Date().toISOString().substring(0, 16);
  axios
    .get("http://localhost:15015/contracts?inst=" + req.params.nipc)
    .then((dados) => {
      console.log(dados.data[0].NomeInstituicao);
      res.render("instituicao", {
        nomeInstituicao: dados.data[0].NomeInstituicao,
        nipc: req.params.nipc,
        contratos: dados.data,
        d: data,
      });
    })
    .catch((erro) => {
      res.render("error", { error: erro });
    });
});

router.get("/:id", function (req, res, next) {
  var data = new Date().toISOString().substring(0, 16);
  console.log(
    "requesting: ",
    "http://localhost:15015/contracts/" + req.params.id
  );
  axios
    .get("http://localhost:15015/contracts/" + req.params.id)
    .then((dados) => {
      console.log(dados.data);
      res.render("contrato", { c: dados.data[0], d: data });
    })
    .catch((erro) => {
      res.render("error", { error: erro });
    });
});

module.exports = router;
