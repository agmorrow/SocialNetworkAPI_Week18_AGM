const { Thought } = require("../models");

module.exports = {
// create a new thought
	// /api/thoughts
	createThought: async (req, res) => {
		const { thoughtText, username } = req.body;
		try {
			const newThought = await Thought.create({ thoughtText, username });
			res.json(newThought);
		} catch (e) {
			res.json(e);
		}
	},



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
	// /api/thoughts/:id
	getThoughtsById({ params }, res) {
		Thought.findOne({ _id: params.id })
			.then(dbThoughtsData => {
				if (!dbThoughtsData) {
					res.status(404).json({ message: "No thoughts found with that id!" });
					return;
				}
				res.json(dbThoughtsData);
			})
			.catch(err => res.json(err));
	},


	// update a thought by ID
	// /api/thoughts/:id
	updateThought({ params, body }, res) {
		Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
			.then(dbThoughtsData => {
				if (!dbThoughtsData) {
					res.status(404).json({ message: "No thought found with that id!" });
					return;
				}
				res.json(dbThoughtsData);
			})
			.catch(err => res.json(err));
	},


	// delete a thought by ID
	// /api/thoughts/:id
	deleteThought({ params }, res) {
		Thought.findOneAndDelete({ _id: params.id })
			.then(dbThoughtsData => {
				if (!dbThoughtsData) {
					res.status(404).json({ message: "No thought found with that id!" });
					return;
				}
				res.json(dbThoughtsData);
			})
			.catch(err => res.json(err));
	},

	// create a reaction
	// /api/thoughts/:id/reactions
	createReaction({ params, body }, res) {
		Thought.findOneAndUpdate(
			{ _id: params.id },
			{ $addToSet: { reactions: body } },
			{ new: true }
		)
			.then(dbThoughtsData => {
				if (!dbThoughtsData) {
					res.status(404).json({ message: "No thought found with that id!" });
					return;
				}
				res.json(dbThoughtsData);
			})
			.catch(err => res.json(err));
	},

	// delete a reaction
	// /api/thoughts/:id/reactions
	deleteReaction({ params }, res) {
		Thought.findOneAndUpdate(
			{ _id: params.id },
			{ $pull: { reactions: { reactionId: params.reactionId } } },
			{ new: true }
		)
			.then(dbThoughtsData => res.json(dbThoughtsData))
			.catch(err => res.json(err));
	},
};

