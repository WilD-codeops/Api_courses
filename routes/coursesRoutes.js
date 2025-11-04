const express = require("express");
const articleController = require("../controllers/articleController");

const router = express.Router();

router.get("/", articleController.index);
router.get("/:id", articleController.show);
router.post("/", articleController.store);
router.put("/:id", articleController.update);
router.delete("/:id", articleController.destroy);
router.delete("/", articleController.clear); //route à protéger auth

module.exports = router;
