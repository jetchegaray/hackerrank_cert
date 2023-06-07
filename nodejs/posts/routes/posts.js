const express = require("express");
const router = express.Router();
const postsController = require("../controllers/posts");

router.post("/", postsController.create);
router.get("/", postsController.getAll);
router.get("/:id", postsController.getById);

//not implemented
router.put("/:id", postsController.put);
router.delete("/:id", postsController.delete);
router.patch("/:id", postsController.patch);

module.exports = router;
