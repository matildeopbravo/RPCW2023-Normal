const Contrato = require("../models/contrato");

module.exports.list = () => {
  return Contrato.find()
    .then((contratos) => {
      return contratos;
    })
    .catch((error) => {
      return error;
    });
};

module.exports.listByYear = (year) => {
  const regexPattern = new RegExp(`.*\/${year}$`);
  return Contrato.find({ DataInicioContrato: { $regex: regexPattern } })
    .then((contratos) => {
      return contratos;
    })
    .catch((error) => {
      return error;
    });
};

db.contracts.aggregate([
  {
    $project: {
      year: {
        $toInt: {
          $substr: ["$DataInicioContrato", 6, 4],
        },
      },
    },
  },
  { $group: { _id: "$year", count: { $sum: 1 } } },
  { $sort: { _id: 1 } },
  { $project: { ano: "$_id", numero: "$count", _id: 0 } },
]);

module.exports.listByInst = (inst) => {
  return Contrato.find({ NIPCInstituicao: inst })
    .then((contratos) => {
      return contratos;
    })
    .catch((error) => {
      return error;
    });
};

module.exports.getById = (id) => {
  return Contrato.find({ _id: id })
    .then((contratos) => {
      return contratos;
    })
    .catch((error) => {
      return error;
    });
};

module.exports.listCourses = () => {
  return Contrato.find()
    .distinct("Curso")
    .then((contratos) => {
      return contratos;
    })
    .catch((error) => {
      return error;
    });
};
module.exports.listInstitutions = () => {
  return Contrato.find()
    .distinct("NomeInstituicao")
    .then((contratos) => {
      return contratos;
    })
    .catch((error) => {
      return error;
    });
};

module.exports.remove = (id) => {
  return Contrato.deleteOne({ _id: id })
    .then((doc) => {
      return doc;
    })
    .catch((err) => {
      return err;
    });
};

module.exports.add = (contrato) => {
  return Contrato.create(contrato)
    .then((doc) => {
      return doc;
    })
    .catch((err) => {
      return err;
    });
};
