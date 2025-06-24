const udb = {
  u: require("../models/users.json"),
  setu: function (d) { this.u = d }
};

const fsp = require('fs').promises;
const pth = require('path');

const logout = async (req, res) => {
  const c = req.cookies;
  if (!c?.jwt) return res.sendStatus(204);

  const rtok = c.jwt;
  const fu = udb.u.find(u => u.refreshToken === rtok);

  if (!fu) {
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
    return res.sendStatus(204);
  }

  const ou = udb.u.filter(u => u.refreshToken !== fu.refreshToken);
  const cu = { ...fu, refreshToken: "" };

  udb.setu([...ou, cu]);

  await fsp.writeFile(
    pth.join(__dirname, '..', 'models', 'users.json'),
    JSON.stringify(udb.u)
  );

  res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
  res.sendStatus(204);
};

module.exports = { logout };
