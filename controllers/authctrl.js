const udb = {
  u: require("../models/users.json"),
  setu: function (d) { this.u = d }
};

const fsp = require('fs').promises;
const pth = require('path');
const bc = require("bcrypt");
const jwt = require('jsonwebtoken');
require('dotenv').config();

const login = async (req, res) => {
  const { username: un, password: pw } = req.body;
  if (!un || !pw)
    return res.status(400).json({ msg: "username and password required" });

  const uf = udb.u.find(u => u.username === un);
  if (!uf)
    return res.sendStatus(401);

  const r = Object.values(uf.roles);
  const m = await bc.compare(pw, uf.password);
  if (m) {
    const atok = jwt.sign(
      { userinfo: { username: uf.username, roles: r } },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '140s' }
    );

    const rtok = jwt.sign(
      { username: uf.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' }
    );

    const ou = udb.u.filter(u => u.username !== uf.username);
    const cu = { ...uf, refreshToken: rtok };
    udb.setu([...ou, cu]);

    console.log(udb.u);

    fsp.writeFile(
      pth.join(__dirname, '..', 'models', 'users.json'),
      JSON.stringify(udb.u)
    );

    res.cookie('jwt', rtok, { httpOnly: true, sameSite: 'none', secure: true });
    res.json({ accessToken: atok });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { login };
