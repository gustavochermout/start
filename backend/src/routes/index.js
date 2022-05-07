const userRoutes = require('../routes/UserRoutes');
const authRoutes = require('../routes/AuthRoutes');

module.exports = {
  useRoutes(app) {
    app.use(authRoutes);
    app.use(userRoutes);
  }
}