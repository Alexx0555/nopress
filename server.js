const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require('cookie-parser')

const verifyJWT = require('./middleware/verifyJWT')

const homerut = require("./routes/homerut"); 
const emprut = require('./routes/api/emprut')

const regrut = require('./routes/regrut')
const authrut = require('./routes/authrut')

const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errHandler");

const port = process.env.PORT || 3000;

// built in middlewares
app.use(express.urlencoded({ extended: false })); //parses data from body of req
app.use(express.json()); //parses json
app.use(cookieParser())

app.use("/", express.static(path.join(__dirname, "public"))); //helps us serve static files
app.use("/subdir", express.static(path.join(__dirname, "public")));

// 3rd party middleware const
const cors = require("cors"); 
const corsOptions = require('./config/corsOptions')
app.use(cors(corsOptions));

// custom middleware
app.use(logger);
app.use(require('./middleware/credentials'))

// routes
app.use("/", homerut);
app.use('/register',regrut)
app.use('/auth',authrut)
app.use('/refresh',require('./routes/refreshrut'))
app.use('/logout',require('./routes/logoutrut'))

//api routes
app.use('/api/employee',verifyJWT ,emprut)

app.all(/^\/.*/, (req, res) => {
  res.status(404);
  if (req.accepts("html"))
    res.sendFile(path.join(__dirname, "views", "404.html"));
  else if (req.accepts("json")) res.send({ error: "404 Not Found" });
  else res.type("txt"), send("404 Not Found");
});

app.use(errorHandler);
app.listen(port, () => {
  console.log("server running");
});
