const { localStorage } = require('../localStorage');

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.render('index');
  });

  app.get('/white', (req, res) => {
    res.render('game', {
      color: 'white',
    });
  });
  app.get('/black', (req, res) => {
    if (!localStorage.getItem(req.query.code)) {
      return res.redirect('/?error=invalidCode');
    }

    res.render('game', {
      color: 'black',
    });
  });
};
