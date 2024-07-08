const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe');
const Ingredient = require('../models/ingredient');
const User = require('../models/user');

router.get('/', async (req, res) => {
  const recipes = await Recipe.find({ owner: req.session.user._id }).populate('ingredients');
  res.render('recipes/index', { recipes });
});

router.get('/new', async (req, res) => {
  const ingredients = await Ingredient.find();
  res.render('recipes/new', { ingredients });
});

router.post('/', async (req, res) => {
  const { name, instructions, ingredients } = req.body;
  const newRecipe = new Recipe({
    name,
    instructions,
    owner: req.session.user._id,
    ingredients
  });
  await newRecipe.save();
  res.redirect('/users/' + req.session.user._id + '/recipes');
});

router.delete('/:recipeId', async (req, res) => {
  await Recipe.findByIdAndDelete(req.params.recipeId);
  res.redirect('/users/' + req.session.user._id + '/recipes');
});

router.get('/:recipeId/edit', async (req, res) => {
  const recipe = await Recipe.findById(req.params.recipeId).populate('ingredients');
  const ingredients = await Ingredient.find();
  res.render('recipes/edit', { recipe, ingredients });
});

router.put('/:recipeId', async (req, res) => {
  const { name, instructions, ingredients } = req.body;
  const recipe = await Recipe.findById(req.params.recipeId);
  recipe.name = name;
  recipe.instructions = instructions;
  recipe.ingredients = ingredients;
  await recipe.save();
  res.redirect('/users/' + req.session.user._id + '/recipes');
});

module.exports = router;
