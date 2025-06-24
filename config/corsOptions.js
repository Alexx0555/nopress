const ao = require('./allowedorg'); 

const co = { 
  origin: (o, cb) => { 
    if (ao.indexOf(o) !== -1 || !o) {
      cb(null, true);
    } else {
      cb(new Error("CORS violated"));
    }
  },
  optionsSuccessStatus: 200,
};

module.exports = co;