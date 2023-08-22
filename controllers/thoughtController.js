const { Thought, User } = require("../models");

module.exports = {
  getThoughts: async (req, res) => {
    try {
      const thoughts = await Thought.find();
      res.status(200).json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getSingleThought: async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.thoughtId);
      !thought ? res.status(404).json({ message: "Thought not found" }) : null;

      res.status(200).json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  createThought: async (req, res) => {
    try {
      const newThought = await Thought.create(req.body);
      await User.findByIdAndUpdate(newThought.userId, {
        $push: { thoughts: newThought._id },
      });
      res.status(201).json(newThought);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  updateThought: async (req, res) => {
    try {
      const updateThought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        req.body,
        { new: true, runValidators: true }
      );
      !updateThought
        ? res.status(404).json({ message: "Thought not found" })
        : null;

      res.status(200).json(updateThought);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  deleteThought: async (req, res) => {
    try {
      const deleteThought = await Thought.findByIdAndDelete(
        req.params.thoughtId
      );
      !deleteThought
        ? res.status(404).json({ message: "Thought not found" })
        : null;

      await User.findByIdAndUpdate(deleteThought.userId, {
        $pull: { thoughts: deleteThought._id },
      });
      res.status(200).json({ message: "Thought deleted successfully" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  createReaction: async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.thoughtId);
      !thought ? res.status(404).json({ message: "Thought not found" }) : null;

      const newReaction = {
        reactionBody: req.body.reactionBody,
        username: req.body.username,
      };
      thought.reactions.push(newReaction);
      await thought.save();
      res.status(201).json(thought);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  deleteReaction: async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.thoughtId);
      !thought ? res.status(404).json({ message: "Thought not found" }) : null;

      thought.reactions.pull(req.params.reactionId);
      await thought.save();
      res.status(200).json({ message: "Reaction deleted successfully" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
