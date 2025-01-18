"use strict";
const plugin = {};

plugin.init = async function (params) {
  const { router, middleware } = params;

  // Register route to render your admin page
  router.get("/admin/plugins/dynamic-reputation", middleware.admin.buildHeader, async (req, res) => {
    res.render("admin/plugins/dynamic-reputation", {
      title: "Dynamic Reputation Admin Panel",
      weights: { upvote: 2, downvote: -2 },
    });
  });

  console.log("[dynamic-reputation-admin] init completed");
};

module.exports = plugin;
