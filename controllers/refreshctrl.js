const udb = {
  u: require("../models/users.json"),
  setu: function (d) { this.u = d }
};

const jwt = require('jsonwebtoken');
require('dotenv').config();

const refresh = (req, res) => {
  const c = req.cookies;
  if (!c?.jwt) return res.sendStatus(401);

  const rtok = c.jwt;
  const fu = udb.u.find(u => u.refreshToken === rtok);
  if (!fu) return res.sendStatus(403);

  const r = Object.values(fu.roles);

  jwt.verify(rtok, process.env.REFRESH_TOKEN_SECRET, (err, dec) => {
    if (err || fu.username !== dec.username)
      return res.sendStatus(403);

    const atok = jwt.sign(
      {
        userinfo: {
          username: fu.username,
          roles: r
        }
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '120s' }
    );

    res.json({ accessToken: atok });
  });
};

module.exports = { refresh };
