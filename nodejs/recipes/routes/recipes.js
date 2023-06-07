var recipes = require("../recipes.json");
var router = require("express").Router();
var fs = require("fs");
var path = require("path");

router.get("/step/:id", (req, res) => {
  if (!req.params.id || isNaN(req.params.id)) res.status(400).send("NOT FOUND");

  if (!req.query.elapsedTime) {
    res.status(200).send("0");
  }

  const timer = req.query.elapsedTime;

  //  const data = JSON.parse(fs.readFileSync(path.join(__dirname + recipes)).toString())

  const recipeFound = recipes.filter(
    (recipe) => recipe.id === +req.params.id
  )[0];

  let indexBreak = recipeFound.timers.length - 1;
  for (
    i = 0;
    i < recipeFound.timers.length &&
    indexBreak === recipeFound.timers.length - 1;
    i++
  ) {
    if (recipeFound.timers[i] > timer) {
      indexBreak = i;
    }
  }

  const results = {
    ...recipeFound,
    steps: recipeFound.steps.slice(indexBreak, recipeFound.steps.length),
    timers: recipeFound.timers.slice(indexBreak, recipeFound.timers.length),
  };

  res.status(200).send(results);
});

module.exports = router;
