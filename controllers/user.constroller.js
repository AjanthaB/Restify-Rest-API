
const errors = require('restify-errors')
const User = require("../models/user");


module.exports.save = (req, res, next) => {
  if (!req.is('application/json')) {
    return next(
      new errors.InvalidContentError("Expects 'application/json'"),
    );
  }

  let data = req.body || {};

  let user = new User(data);
  user.save((err) => {
    if (err) {
      console.error(err);
      return next(new errors.InternalError(err.message));
    }

    res.send(201, user)
  });
}

module.exports.get = (req, res, next) => {
  User.find({})
    .lean()
    .exec()
    .then(users => res.send(200, users))
    .catch(err => next(
       new errors.InternalError(err.message)
    ))
}

module.exports.getById = (req, res, next) => {
  const userId = req.params.userId;

  User.findById(userId)
    .lean()
    .exec()
    .then(user => res.send(200, user))
    .catch(err => next(
      new errors.InternalError(err.message)
    ))
}

module.exports.remove = (req, res, next) => {
  const userId = req.params.userId;

  User.findByIdAndRemove(userId)
    .lean()
    .exec()
    .then(user => res.send(200))
    .catch(err => next(
      new errors.InternalError(err.message)
    ))
}

module.exports.update = (req, res, next) => {
  const user = req.body

  const userWithoutId = () => {
    delete user['_id']
    return user
  }

  User.findByIdAndUpdate(user._id, {$set: userWithoutId()}, {new: true})
    .lean()
    .exec()
    .then(user => res.send(200, user))
    .catch(err => next(
      new errors.InternalError(err.message)
    ));
}