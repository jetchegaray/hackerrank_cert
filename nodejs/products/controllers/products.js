const Products = require("../models/products");

class ProductController {
  createProduct = async (req, res) => {
    try {
      const { body } = req;
      const data = await Products.findAll({});
      body.id = data.length + 1;
      body.isPublished = false;
      const response = await Products.create(body);
      res.status(201).json(response);
    } catch (err) {
      throw new Error(err.message);
    }
  };

  getAllProducts = async (req, res) => {
    try {
      const { body } = req;
      const data = await Products.findAll({});
      res.status(200).json(data);
    } catch (err) {
      throw new Error(err.message);
    }
  };

  modifyProduct = async (req, res) => {
    const { id } = req.params;

    const product = await Products.findOne({ where: { id } });

    let errorMessages = [];
    if (product.mrp < product.price) {
      errorMessages.push("MRP should be less than equal to the Price");
    }
    if (product.stock <= 0) {
      errorMessages.push("Stock count is 0");
    }

    if (errorMessages.length > 0) {
      res.status(422).json(errorMessages);
    } else {
      await Products.update({ isPublished: true }, { where: { id } });
      res.status(204).send({});
    }
  };

  deleteProduct = async (req, res) => {
    res.status(405).send({});
  };

  modifiyEntireProduct = async (req, res) => {
    res.status(405).send({});
  };
}

module.exports = new ProductController();
