const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");

module.exports = {
  getUsers: async (req, res) => {
    try {
      const users = await User.find().populate("thoughts friends");
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getSingleUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.userId).populate(
        "thoughts friends"
      );
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  createUser: async (req, res) => {
    try {
      const newUser = await User.create(req.body);
      res.status(201).json(newUser);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  updateUser: async (req, res) => {
    try {
      const updateUser = await User.findByIdAndUpdate(
        req.params.userId,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
      !updateUser
        ? res.status(404).json({ message: "User not found" })
        : res.status(200).json(updateUser);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  deleteUser: async (req, res) => {
    try {
      const deleteUser = await User.findByIdAndDelete(req.params.userId);
      !deleteUser ? res.status(404).json({ message: "User not found" }) : null;

      await User.updateMany(
        { friends: req.params.userId },
        { $pull: { friends: req.params.userId } }
      );

      await Thought.deleteMany({ username: deleteUser.username });
      res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  addFriend: async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      const friend = await User.findById(req.params.friendId);

      !user || !friend
        ? res.status(404).json({ message: "User or friend not found" })
        : null;

      user.friends.push(friend._id);
      await user.save();

      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  removeFriend: async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);

      !user ? res.status(404).json({ message: "User not found" }) : null;

      user.friends.pull(req.params.friendId);
      await user.save();

      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
