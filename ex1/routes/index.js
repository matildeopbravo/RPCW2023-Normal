var express = require("express");
var router = express.Router();
const Contrato = require("../controllers/contrato");

//GET /contracts: devolve uma lista com todos os contratos;
//GET /contracts?year=YYYY: devolve a lista dos contratos realizados durante o ano YYYY;
//GET /contracts?inst=AAA: devolve a lista dos contratos realizados pela instituição contratante AAA;
router.get("/contracts", function (req, res, next) {
  const { year, inst } = req.query;
  let result;
  if (year) {
    result = Contrato.listByYear(year);
  } else if (inst && !isNaN(parseInt(inst))) {
    result = Contrato.listByInst(parseInt(inst));
  } else {
    result = Contrato.list();
  }
  result
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(520).json({ err: err });
    });
});
//GET /contracts/courses: devolve a lista dos cursos dos contratados (sem repetições);
router.get("/contracts/courses", function (req, res, next) {
  Contrato.listCourses()
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(520).json({ err: err });
    });
});

//GET /contracts/institutions: devolve a lista das instituições contratantes (sem repetições);
router.get("/contracts/institutions", function (req, res, next) {
  Contrato.listInstitutions()
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(520).json({ err: err });
    });
});

router.get("/contracts/:id", function (req, res, next) {
  Contrato.getById(req.params.id)
    .then((docs) => {
      res.status(200).json(docs);
    })
    .catch((err) => {
      res.status(520).json({ err: err });
    });
});
//POST /contracts: acrescenta um contrato novo à BD;
router.post("/contracts", function (req, res, next) {
  Contrato.add(req.body)
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      res.status(520).json({ err: err });
    });
});

//DELETE /contracts/:id: elimina da BD o contrato com o identificador id.
router.delete("/contracts/:id", function (req, res, next) {
  Contrato.remove(req.params.id)
    .then((doc) => {
      res.status(200).json(doc);
    })
    .catch((err) => {
      res.status(520).json({ err: err });
    });
});
module.exports = router;
