const express = require("express");
const fs = require("fs");
const cors = require("cors");
const morgan = require("morgan");
const low = require("lowdb");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const defaultRouter = require("./routes/default");
const booksRouter = require("./routes/books");
const redocRouter = require("./routes/redoc");
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
      title: "OpenAPI for Library", // specify the title of api
      version: "1.0.0",
      description: "Specification for OpenAPI based Library API",
      termsOfService: "https://github.com/murshidazher/terms/",
      contact: {
        name: "Murshid Azher",
        url: "https://github.com/murshidazher",
        email: "hello@murshidazher.com",
      },
      license: {
        name: "MIT",
        url: "https://github.com/murshidazher/express-swagger-api/LICENSE",
      },
    },
    servers: [
      {
        url: `${settings.protocol}://${settings.host}${
          settings.env == "development" ? `:${settings.port}` : ""
        }`, // you can also specify the staging, dev and prod too
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
app.use("/docs", redocRouter);

app.listen(settings.port, (err) => {
  if (err) {
    console.log(err);
  } else {
    // write to specification to a file
    try {
      fs.writeFileSync("./docs/swagger.json", JSON.stringify(specs));
    } catch (err) {
      console.error(err);
    }

    console.log(`NODE_ENV = ${settings.env}`);
    console.log(
      `🚀 Server started at ${settings.protocol}://${settings.host}${
        settings.env == "development" ? `:${settings.port}` : ""
      }`
    );
  }
});
