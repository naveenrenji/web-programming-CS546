const arrayRoutes = require('./sortArray');


const constructorMethod = (app) => {
  app.use('/', arrayRoutes);
  app.use('*', (req, res) => {
    res.status(404).json({ error: 'Not found' });
  });
};

module.exports = constructorMethod;