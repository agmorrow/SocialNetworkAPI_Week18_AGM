const { Thought } = require("../models");

module.exports = {
	// create a new thought
	createThought: async (req, res) => {
		const {
			thoughtText,
			username
		} = req.body;
		try {
			const newThought = await Thought.create({
				thoughtText,
				username
			});
			res.json(newThought);
		} catch (e) {
			res.json(e);
		}
	},

	// get all thoughts
	getThoughts: async (req, res) => {
		try {
			const thoughts = await Thought.find().populate({
				path: '_id',
				select: '-thoughtText -username -userId'
			});
			res.json(thoughts);
		} catch (e) {
			res.json(e);
		}
	},

	// get one thought by ID
	getThoughtsById({ params }, res) {
		Thought.findOne({
				_id: params.id
			})
			.then(dbThoughtsData => {
				if (!dbThoughtsData) {
					res.status(404).json({
						message: "No thoughts found with that id!"
					});
					return;
				}
				res.json(dbThoughtsData);
			})
			.catch(err => res.json(err));
	},

	// update a thought by ID
	updateThought({ params, body }, res) {
		Thought.findOneAndUpdate({
				_id: params.id
			}, body, {
				new: true
			})
			.then(dbThoughtsData => {
				if (!dbThoughtsData) {
					res.status(404).json({
						message: "No thought found with that id!"
					});
					return;
				}
				res.json(dbThoughtsData);
			})
			.catch(err => res.json(err));
	},

	// delete a thought by ID
	deleteThought({ params }, res) {
		Thought.findOneAndDelete({
				_id: params.id
			})
			.then(dbThoughtsData => {
				if (!dbThoughtsData) {
					res.status(404).json({
						message: "No thought found with that id!"
					});
					return;
				}
				res.json(dbThoughtsData);
			})
			.catch(err => res.json(err));
	},

	// create a reaction
	createReaction({ params, body }, res) {
		Thought.findOneAndUpdate({
				_id: params.id
			}, {
				$addToSet: {
					reactions: body
				}
			}, {
				new: true
			})
			.then(dbThoughtsData => {
				if (!dbThoughtsData) {
					res.status(404).json({
						message: "No thought found with that id!"
					});
					return;
				}
				res.json(dbThoughtsData);
			})
			.catch(err => res.json(err));
	},

	// delete a reaction
	deleteReaction({ params }, res) {
		Thought.findOneAndUpdate({
				_id: params.id
			}, {
				$pull: {
					reactions: {
						reactionId: params.reactionId
					}
				}
			}, {
				new: true
			})
			.then(dbThoughtsData => res.json(dbThoughtsData))
			.catch(err => res.json(err));
	},
};