// library.js
"use strict";

const plugin = {};
const controllers = require("./admin");

plugin.init = async function (params) {
  const { router, middleware } = params;

  // Admin route for plugin settings
  router.get("/admin/plugins/dynamic-reputation", middleware.admin.buildHeader, controllers.renderAdminPage);
  router.get("/api/admin/plugins/dynamic-reputation", controllers.renderAdminPage);

  // API endpoint to update weights
  router.post("/api/admin/plugins/dynamic-reputation/weights", controllers.updateWeights);

  console.log("Dynamic Reputation Admin Plugin initialized!");
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
