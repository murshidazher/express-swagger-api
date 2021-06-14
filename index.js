const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const low = require("lowdb");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const defaultRouter = require("./routes/default");
const booksRouter = require("./routes/books");
const settings = require("./config/settings");

const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = low(adapter);

db.defaults({ books: [] }).write();

// create an options object before the express app
const options = {
  definition: {
    openapi: "3.0.0", // specify the version of open api
    info: {
      title: "Library API", // specify the title of api
      version: "1.0.0",
      description: "A simple Express Library API",
    },
    servers: [
      {
        url: `${settings.protocol}://${settings.host}:${settings.port}`, // you can also specify the staging, dev and prod too
      },
    ],
  },
  apis: ["./routes/*.js"], // specify all the routes
};

// initialize the swagger js docs
// it know now where to parse the doc comments to create the docs
const specs = swaggerJsDoc(options);

const app = express();

// create a route with swagger
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.db = db;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/", defaultRouter);
app.use("/books", booksRouter);

app.listen(settings.port, () =>
  console.log(
    `The server is running on ${settings.protocol}://${settings.host}:${settings.port}`
  )
);
