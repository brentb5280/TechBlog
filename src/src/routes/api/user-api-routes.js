const router = require('express').Router();
const db = require('../../models');

//users
router.get('/', async (req, res) => {
  try {
    const users = await db.User.findAll({
      attributes: { 
        exclude: ['password']
      }
    });
   
    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/:userId', async (req, res) => {
  try {
    const user = await db.User.findOne({
      attributes: {
        exclude: ['password']
      },
      where: {
        id: req.params.userId
      },
      include: [
        {
          model: db.Article,
          attributes: [
            'id', 
            'title', 
            'content',
            'created_at',
          ],
        },
      ],
    });

    if (!user) {
      res.status(404).json({message: 'User not found'});
      return;
    }

    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
router.post('/login', async (req, res) => {
  try {
    const user = await db.User.findOne({
      attributes: {
      },
      where: {
        username: req.body.username,
      },
    })

    if(!user) {
      res.status(400).json({message: 'User not found'});
      return;
    }

    const isPassValid = user.checkPassword(req.body.password, user.password);

    if(!isPassValid) {
      res.status(400).json({message: 'User not found'});
      return;
    }

    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.username = user.username;
      req.session.loggedIn = true;
    });

    res.json({ user: user, message: 'User is not logged in.'});

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/logout', async (req, res) => {
  try {
    console.log(req.session)
    if (req.session.loggedIn) {
      await req.session.destroy(() => {
        res.status(204).end();
      });
      return;
    }

    res.status(404).end();

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
//new user
router.post('/', async (req, res) => {
  try {
    const newUser = await db.User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });

    await req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.username = newUser.username;
      req.session.loggedIn = true;
    });

    res.json(newUser);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Deletes user
router.delete('/:userId', async (req, res) => {
  try {
    const user = db.User.destroy({ 
      where: {
        id: req.params.userId,
      },
    })

    res.json({message: 'User deleted.'});

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


module.exports = router;
