const express = require("express");
const router = express.Router();
const { nanoid } = require("nanoid");

const idLength = 8;

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - author
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: The auto-generated id of the book
 *           example: d5fE_asz
 *           readOnly: true
 *         title:
 *           type: string
 *           minLength: 2
 *           maxLength: 100
 *           example: The New Turing Omnibus
 *           description: The book title
 *         author:
 *           type: string
 *           minLength: 2
 *           maxLength: 100
 *           example: Alexander K. Dewdney
 *           description: The book author
 */

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: The books managing API
 */

/**
 * @swagger
 * /api/v1/books:
 *   get:
 *     summary: Returns the list of all the books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: The list of the books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */

router.get("/", (req, res) => {
  const books = req.app.db.get("books");

  res.send(books);
});

/**
 * @swagger
 * /api/v1/books/{id}:
 *   get:
 *     summary: Get the book by id
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book id
 *     responses:
 *       200:
 *         description: The book description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: The book was not found
 */

router.get("/:id", (req, res) => {
  const book = req.app.db.get("books").find({ id: req.params.id }).value();

  if (!book) {
    res.sendStatus(404);
  }

  res.send(book);
});

/**
 * @swagger
 * /api/v1/books:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: The book was successfully created
 *         headers:
 *          Location:
 *            description: Location of the created book
 *            schema:
 *              type: string
 *              format: uri
 *              example: 'http://example.com/api/v1/books/{assinedIdValue}'
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       500:
 *         description: Some server error
 */

router.post("/", (req, res) => {
  try {
    const book = {
      ...req.body,
      id: nanoid(idLength),
    };

    req.app.db.get("books").push(book).write();

    res.send(book);
  } catch (error) {
    return res.status(500).send(error);
  }
});

/**
 * @swagger
 * /api/v1/books/{id}:
 *  put:
 *    summary: Update the book by the id
 *    tags: [Books]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The book id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Book'
 *    responses:
 *      200:
 *        description: The book was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Book'
 *      404:
 *        description: The book was not found
 *      500:
 *        description: Some error happened
 */

router.put("/:id", (req, res) => {
  try {
    req.app.db
      .get("books")
      .find({ id: req.params.id })
      .assign(req.body)
      .write();

    res.send(req.app.db.get("books").find({ id: req.params.id }));
  } catch (error) {
    return res.status(500).send(error);
  }
});

/**
 * @swagger
 * /api/v1/books/{id}:
 *   delete:
 *     summary: Remove the book by id
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book id
 *
 *     responses:
 *       200:
 *         description: The book was deleted
 *       404:
 *         description: The book was not found
 */

router.delete("/:id", (req, res) => {
  req.app.db.get("books").remove({ id: req.params.id }).write();

  res.sendStatus(200);
});

module.exports = router;
