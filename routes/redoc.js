const express = require("express");
const redoc = require("redoc-express");
const router = express.Router();

// serve redoc
router.get(
  "/",
  redoc({
    title: "Redoc API Docs",
    specUrl: "./docs/swagger.json",
  })
);

// serve your swagger.json file
router.get("/swagger.json", (req, res) => {
  res.sendFile("./docs/swagger.json", { root: "." });
});

module.exports = router;
