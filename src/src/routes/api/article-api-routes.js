const router = require('express').Router();
const db = require('../../models');

//articles
router.get('/', async (req, res) => {
  try {
    const articles = await db.Article.findAll({
      attributes: [
        'id',
        'title',
        'content',
        'created_at',
      ],
      include: [
        {
          model: db.User,
          attribute: ['username'],
        },
      ],
    })

    res.json(articles)
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }

});


router.get('/:articleId', async (req, res) => {
  try {
    const article = await db.Article.findOne({
      where: {
        id: req.params.articleId,
      },
      attributes: [
        'id',
        'title',
        'content',
        'created_at',
      ],
      include: [
        {
          model: db.User,
          attributes: ['username'],
        },
      ],
    });

    res.json(article);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


router.get('/user/:userId', async (req, res) => {
  try {
    const articles = await db.Article.findAll({
      where: {
        user_id: req.params.userId,
      },
      attributes: [
        'id',
        'user_id',
        'title',
        'content',
        'created_at',
      ],
      include: [
        {
          model: db.User,
          attributes: ['username'],
        },
      ],
    });

    res.json(articles);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const article = await db.Article.create({
      title: req.body.title,
      content: req.body.content,
    
      user_id: req.body.userId,
    });
    res.json(article);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put('/:articleId', (req, res) => {
  try {
    const article = db.Article.update({
      title: req.body.title,
      post_content: req.body.content
      },
      {
        where: {
          id: req.params.articleId,
        },
      }
    )
    if (!article) {
      res.status(404).json({ message: "Article not found" });
      return;
    }

    res.json(article);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete('/:articleId', async (req, res) => {
  try {
    const article = await db.Article.destroy({
      where: {
        id: req.params.articleId,
      },
    })

    if (!article) {
      res.status(404).json({ message: "Article not found" });
      return;
    }
    res.json({message: 'Article deteleted, I hope you knew what you were doing.'});

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
