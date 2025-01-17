// utils.js
"use strict";

const db = require.main.require("./src/database");
const meta = require.main.require("./src/meta");

// This key is just an example for storing plugin config
const DB_KEY = "plugin:dynamic-reputation-config";

module.exports = {
  async getCurrentWeights() {
    const config = await db.getObject(DB_KEY);
    if (!config) {
      // Return defaults if nothing is stored
      return { upvote: 2, downvote: -2, comment: 3, flag: -5, share: 4 };
    }
    return config;
  },

  async updateWeightsInReputationPlugin(newWeights) {
    // Save to DB
    await db.setObject(DB_KEY, newWeights);

    // Optionally, use NodeBB's pubsub to broadcast the update
    // so that the dynamic-reputation plugin picks it up in real time
    meta.publish(DB_KEY, newWeights);
  }
};
