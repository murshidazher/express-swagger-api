const express = require("express");
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Heartbeat:
 *       type: object
 *       properties:
 *         response:
 *           type: string
 *           description: The auto-generated response for heartbeat
 *       example:
 *         response: pong
 */

/**
 * @swagger
 * /api/v1:
 *   get:
 *     summary: Returns a response as pong
 *     responses:
 *       200:
 *         description: The initial heartbeat request
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               items:
 *                 $ref: '#/components/schemas/Heartbeat'
 */
router.get("/", (req, res) => {
  res.send({ response: "pong" });
});

module.exports = router;
