const router = require('express').Router();
const path = require('path');

router.get('/', (req, res) => {
  res.render('index', {layout: 'main'});
});

module.exports = router;
