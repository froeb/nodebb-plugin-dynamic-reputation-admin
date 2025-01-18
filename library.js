"use strict";
const plugin = {};

plugin.init = async function (params) {
  const { router, middleware /*, controllers */ } = params;

  // Add a route to render your admin page
  router.get("/admin/plugins/dynamic-reputation", middleware.admin.buildHeader, async (req, res) => {
    // Render the .tpl file, pass some data to the template
    res.render("admin/plugins/dynamic-reputation", {
      title: "Dynamic Reputation Admin Panel",
      weights: { upvote: 2, downvote: -2 },
    });
  });

  // (Optional) Also handle the API route without the admin wrapper
  router.get("/api/admin/plugins/dynamic-reputation", async (req, res) => {
    res.json({ success: true, message: "Dynamic Reputation Admin Panel" });
  });

  console.log("[dynamic-reputation-admin] init completed");
};

plugin.addAdminNavigation = async function (header) {
  header.plugins.push({
    route: "/plugins/dynamic-reputation",
    icon: "fa-bar-chart",
    name: "Dynamic Reputation"
  });
  return header;
};

module.exports = plugin;
