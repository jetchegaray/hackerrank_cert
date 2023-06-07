const router = require("express").Router();
const controller = require("../controllers/products");

router.post("/", controller.createProduct);
router.get("/", controller.getAllProducts);
router.patch("/:id", controller.modifyProduct);
router.put("/:id", controller.modifiyEntireProduct);
router.delete("/:id", controller.deleteProduct);

module.exports = router;
