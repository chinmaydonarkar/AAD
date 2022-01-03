require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const favicon = require("static-favicon");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const testRoute = require("./routes/test.routes");

var methodOverride = require("method-override");
var passport = require("passport");
var expressSession = require("express-session");

// Start QuickStart here
var OIDCStrategy = require("passport-azure-ad").OIDCStrategy;
const config = require("./config");

const app = express();
const port = process.env.PORT || 8080;

// swagger setup
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-dev-api.json");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(
  expressSession({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: false,
  })
);

app.use(favicon());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride());
app.use(passport.initialize());
app.use(passport.session());
// app.use(cors({credentials: true}));

// CORS headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token"
  );
  // Handle preflight OPTIONS request
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

passport.serializeUser(function (user, done) {
  done(null, user.oid);
});

passport.deserializeUser(function (oid, done) {
  findByOid(oid, function (err, user) {
    done(err, user);
  });
});

// array to hold logged in users
var users = [];

var findByOid = function (oid, fn) {
  for (var i = 0, len = users.length; i < len; i++) {
    var user = users[i];
    // log.info("we are using user: ", user);
    if (user.oid === oid) {
      return fn(null, user);
    }
  }
  return fn(null, null);
};

//-----------------------------------------------------------------------------
passport.use(
  new OIDCStrategy(
    {
      identityMetadata: process.env.IDENTITY_META_DATA,
      clientID: process.env.CLIENT_ID,
      responseType: process.env.RESPONSE_TYPE,
      responseMode: process.env.RESPONSE_MODE,
      redirectUrl: process.env.REDIRECTURL,
      allowHttpForRedirectUrl: true,
      clientSecret: process.env.CLIENT_SECRET,
    },
    function (iss, sub, profile, accessToken, refreshToken, done) {
      if (!profile.oid) {
        return done(new Error("No oid found"), null);
      }
      // asynchronous verification, for effect...
      process.nextTick(function () {
        findByOid(profile.oid, function (err, user, res) {
          if (err) {
            return done(err);
          }
          if (!user) {
            // "Auto-registration"
            users.push(profile);
            // console.log("accc",accessToken)
            return done(null, profile);
          }
          return done(null, user);
        });
      });
    }
  )
);

//http://localhost:8080/api/v1/truvian/signsuccess
app.use("/api/v1/truvian/", testRoute);

app.get("/", (req, res) => {
  res.render("index", {
    title: "Truvian",
    message: "Welcome to web cloud backend",
  });
});

/// catch 404 and forwarding to error handler
app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// db.Sequelize.sync();
// db.Sequelize.sync({ alter: true }).then(() => {
//    console.log("Drop and re-sync db.");
// });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  console.log(err.message);
  res.json(err.message);
});

// Start the server
var server = app.listen(port, () => {
  console.log("Server running on port*", port);
});
server.timeout = 0;

module.exports = app;
