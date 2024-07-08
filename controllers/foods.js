const express = require('express');
const router = express.Router();
const User = require('../models/user');


router.get('/', async (req, res) => {
  const user = await User.findById(req.session.user._id);
  res.render('foods/index', { pantry: user.pantry });
});

router.get('/new', (req, res) => {
  res.render('foods/new');
});

router.post('/', async (req, res) => {
  const user = await User.findById(req.session.user._id);
  user.pantry.push(req.body);
  await user.save();
  res.redirect(`/users/${req.session.user._id}/foods`);
});

router.delete('/:itemId', async (req, res) =>  {
  try {
    const user = await User.findById(req.session.user._id);
    user.pantry.id(req.params.itemId).deleteOne();
    await user.save();
    res.redirect(`/users/${req.session.user._id}/foods`);
  } catch (error) {
    res.redirect('/')
  }
});


router.get('/:itemId/edit', async (req, res) => {
  const user = await User.findById(req.session.user._id);
  const foodItem = user.pantry.id(req.params.itemId);
  res.render('foods/edit.ejs', { foodItem });
});

router.put('/:itemId', async (req, res) => {
  const user = await User.findById(req.session.user._id);
  const foodItem = user.pantry.id(req.params.itemId);
  foodItem.set(req.body);
  await user.save();
  res.redirect(`/users/${req.session.user._id}/foods`);
});

module.exports = router;
