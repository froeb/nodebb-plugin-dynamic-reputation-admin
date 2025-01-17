// admin.js
"use strict";

const { updateWeightsInReputationPlugin, getCurrentWeights } = require("./utils");

module.exports = {
  renderAdminPage: async function (req, res) {
    // Retrieve current weights from the dynamic reputation plugin (if stored in DB or NodeBB settings)
    const currentWeights = await getCurrentWeights();
    res.render("admin/plugins/dynamic-reputation", {
      title: "Dynamic Reputation Admin",
      weights: currentWeights
    });
  },

  updateWeights: async function (req, res) {
    try {
      const newWeights = req.body.weights; // e.g. { upvote: 3, downvote: -2, comment: 2, ... }
      await updateWeightsInReputationPlugin(newWeights);
      res.status(200).json({ message: "Weights updated successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  }
};
