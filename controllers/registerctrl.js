const udb = {
  u: require("../models/users.json"),
  setu: function (d) { this.u = d }
};

const fsp = require('fs').promises;
const pth = require('path');
const bc = require("bcrypt");

const register = async (req, res) => {
  const { username: un, password: pw } = req.body;
  if (!un || !pw)
    return res.status(400).json({ msg: "username and password required" });

  const dup = udb.u.find(u => u.username === un);
  if (dup) return res.sendStatus(409);

  try {
    const hpw = await bc.hash(pw, 10);
    const nu = { username: un, password: hpw, roles: { user: 2001 } };

    udb.setu([...udb.u, nu]);
    console.log(nu);

    await fsp.writeFile(
      pth.join(__dirname, '..', 'models', 'users.json'),
      JSON.stringify(udb.u)
    );

    res.status(201).json({ msg: "new user is created" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

module.exports = { register };
