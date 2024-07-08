const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', async (req, res) => {
  const users = await User.find();
  res.render('users/index', { users });
});

router.get('/:userId', async (req, res) => {
  const user = await User.findById(req.params.userId);
  res.render('users/show', { user });
});

module.exports = router;
