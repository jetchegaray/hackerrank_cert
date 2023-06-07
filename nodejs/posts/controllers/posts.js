const e = require("express");
const Posts = require("../models/posts");

class PostsController {
  constructor() {}

  create = async (req, res) => {
    try {
      const { body } = req;
      const data = await Posts.findAll({});

      body.id = data.length + 1;
      if (body.isPublished == true) {
        body.publishedDate = Date.now();
      }
      const response = await Posts.create(body);
      res.status(201).json(response);
    } catch (err) {
      throw new Error(err.message);
    }
  };

  getAll = async (req, res) => {
    try {
      const { author, isPublished } = req.query;

      if (author && (isPublished === true || isPublished === false)) {
        res
          .status(200)
          .json(
            await Posts.findAll(
              { where: { author, isPublished } },
              { order: [["id", "ASC"]] }
            )
          );
        return;
      } else if (
        author &&
        (!isPublished || (isPublished != true && isPublished != false))
      ) {
        res
          .status(200)
          .json(
            await Posts.findAll(
              { where: { author } },
              { order: [["id", "ASC"]] }
            )
          );
        return;
      } else if (!author && (isPublished == true || isPublished == false)) {
        res
          .status(200)
          .json(
            await Posts.findAll(
              { where: { isPublished } },
              { order: [["id", "ASC"]] }
            )
          );
        return;
      }

      res.status(200).json(await Posts.findAll({ order: [["id", "ASC"]] }));
    } catch (err) {
      throw new Error(err.message);
    }
  };

  getById = async (req, res) => {
    try {
      const { id } = req.params;

      const data = await Posts.findOne({ where: { id } });

      if (!data) {
        res.status(404).send("ID not found");
      } else {
        res.status(200).json(data);
      }
    } catch (err) {
      throw new Error(err.message);
    }
  };

  put = async (req, res) => {
    res.status(405).send({});
  };

  patch = async (req, res) => {
    res.status(405).send({});
  };

  delete = (req, res) => {
    res.status(405).send({});
  };
}

module.exports = new PostsController();
