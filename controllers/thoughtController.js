const { Thought } = require("../models");

module.exports = {
	// createThought({ body }, res) {
	// 	Thoughts.create(body)
	// 		.then(({ _id }) => {
	// 			console.log(_id);
	// 			return User.findOneAndUpdate(
	// 				{ _id: body.userId },
	// 				{ $push: { thoughts: _id } },
	// 				{ new: true }
	// 			);
	// 		})
	// 		.then(dbThoughtsData => {
	// 			if (!dbThoughtsData) {
	// 				res.status(404).json({ message: "No thought found with that id!" });
	// 				return;
	// 			}
	// 			res.json(dbThoughtsData);
	// 		})
	// 		.catch(err => res.json(err));
	// },


	createThought: async (req, res) => {
		const { thoughtText, username, userId } = req.body;
		try {
			const newThought = await Thought.create({ thoughtText, username, userId });
			res.json(newThought);
		} catch (e) {
			res.json(e);
		}
	},


	// get all thought
	// /api/thoughts
	// getAllThoughts(req, res) {
	// 	Thoughts.find({})
	// 		.then(dbThoughtsData => res.json(dbThoughtsData))
	// 		.catch(err => res.json(err));
	// },



	getAllThoughts: async (req, res) => {
		try {
			const thoughts = await Thoughts.find().populate({
				path: 'userId',
				select: '-thoughtText -username -userId'
			});
			res.json(thoughts);
		} catch (e) {
			res.json(e);
		}
	},

	// get one thought by ID
	// /api/thoughts/:id
	getthoughtById({ params }, res) {
		Thoughts.findOne({ _id: params.id })
			.then(dbThoughtsData => {
				if (!dbThoughtsData) {
					res.status(404).json({ message: "No thoughts found with that id!" });
					return;
				}
				res.json(dbThoughtsData);
			})
			.catch(err => res.json(err));
	},

	// create a new thought
	// /api/thoughts


	// update a thought by ID
	// /api/thoughts/:id
	updateThought({ params, body }, res) {
		Thoughts.findOneAndUpdate({ _id: params.id }, body, { new: true })
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
		Thoughts.findOneAndDelete({ _id: params.id })
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
		Thoughts.findOneAndUpdate(
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
		Thoughts.findOneAndUpdate(
			{ _id: params.id },
			{ $pull: { reactions: { reactionId: params.reactionId } } },
			{ new: true }
		)
			.then(dbThoughtsData => res.json(dbThoughtsData))
			.catch(err => res.json(err));
	},
};

