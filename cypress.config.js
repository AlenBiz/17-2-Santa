const { defineConfig } = require("cypress");

module.exports = defineConfig({
  defaultCommandTimeout: 8000, 
  pageLoadTimeout:10000,
  e2e: {
    baseUrl: "https://staging.lpitko.ru",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
