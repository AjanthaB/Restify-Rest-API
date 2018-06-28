const userConstoller = require('../controllers/user.constroller')

module.exports = (server) => {
  server.post('/api/v1/users', userConstoller.save);
  server.get('/api/v1/users', userConstoller.get)
  server.get('/api/v1/users/:userId', userConstoller.getById)
  server.del('/api/v1/users/:userId', userConstoller.remove)
  server.put('/api/v1/users', userConstoller.update)
}