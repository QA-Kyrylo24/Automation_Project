import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://practicesoftwaretesting.com',
    env: {
      USER_EMAIL: 'customer@practicesoftwaretesting.com',
      USER_PASSWORD: 'welcome01'
    },
    supportFile: 'cypress/support/e2e.ts',
    specPattern: 'cypress/e2e/**/*.cy.ts'
  },
  },
);
