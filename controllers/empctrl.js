const db = {
  e: require("../models/employees.json"),
  sete: function (d) { this.e = d }
};

const create = (req, res) => {
  const ne = {
    _id: db.e[db.e.length - 1]?._id + 1 || 1,
    fn: req.body.firstname,
    ln: req.body.lastname
  };

  if (!ne.fn || !ne.ln)
    return res.status(400).json({ msg: "first name and last name required" });

  db.sete([...db.e, ne]);
  res.status(201).json(db.e);
};

const update = (req, res) => {
  const emp = db.e.find(e => e._id === parseInt(req.body.id));
  if (!emp)
    return res.status(400).json({ msg: `emp id ${req.body.id} not found` });

  if (req.body.firstname) emp.fn = req.body.firstname;
  if (req.body.lastname) emp.ln = req.body.lastname;

  const f = db.e.filter(e => e._id !== parseInt(req.body.id));
  const u = [...f, emp];
  db.sete(u.sort((a, b) => a._id > b._id ? 1 : -1));

  res.json(db.e);
};

const del = (req, res) => {
  const emp = db.e.find(e => e._id === parseInt(req.body.id));
  if (!emp)
    return res.status(400).json({ msg: `emp id ${req.body.id} not found` });

  const f = db.e.filter(e => e._id !== parseInt(req.body.id));
  db.sete([...f]);

  res.json(db.e);
};

const getAll = (req, res) => {
  res.json(db.e);
};

const getOne = (req, res) => {
  const emp = db.e.find(e => e._id === parseInt(req.params.id));
  if (!emp)
    return res.status(400).json({ msg: `emp id ${req.params.id} not found` });

  res.json(emp);
};

module.exports = {
  getAll,
  getOne,
  update,
  create,
  del
};
