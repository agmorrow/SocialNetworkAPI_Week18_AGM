const { User } = require('../models');
const { db } = require('../models/User');

const userController = {
  // get all users
  getAllUsers(req, res) {
    User.find({})
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.sendStatus(400);
    });
  },

  // get one user by id
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No User found with this id!'});
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
    });
  },

  // create user
  createUser({ body }, res) {
    User.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  },

  // update user by id
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No User found with this id!' });
          return;
        }
        res.json(dbusertData);
      })
      .catch(err => res.status(400).json(err));
  },

  // delete user
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No User found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  },

  // add friend to user list
  // removed "body" in brackets
  addFriend({ params }, res) {
    User.findByIdAndUpdate(
      { _id: params.id }, // changed from params.userId to params.id
      { $addToSet: { friends:params.friendId } },
      { new: true })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No friend found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

  // remove friend
  removeFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.id },
      { $pull: { friends:params.friendId }},
      { new: true }
    )
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  }
}


module.exports = userController;