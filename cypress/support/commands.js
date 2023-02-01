const loginPage = require("../fixtures/pages/loginPage.json");
const generalElements = require("../fixtures/pages/general.json");


Cypress.Commands.add("login", (userName, password) => {
  cy.get(loginPage.loginField).clear().type(userName);
  cy.get(loginPage.passwordField).clear().type(password);
  cy.get(generalElements.submitButton).click({ force: true });
});


Cypress.Commands.add("changeAssword", (userName, newAssword) => {
  cy.contains(userName).click({force:true});
  cy.get(".layout-column-start > :nth-child(1) > .frm").type(newAssword);
  cy.get(
    ":nth-child(4) > .form-page-group__main > .layout-column-start > :nth-child(2) > .frm"
  ).type(newAssword);
  cy.get(".layout-row-end > .btn-service").click();
});
