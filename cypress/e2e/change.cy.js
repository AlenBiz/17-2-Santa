import { faker } from "@faker-js/faker";
import "@bahmutov/cy-api";

const userAdmin = require("../fixtures/useradminbox.json");

let newPassword = faker.word.adjective( { lenght: {min: 8, min: 20}} );
let cookie_connect_sid;

describe("change password", () => {

it("get cookie", ()=> {
    cy.apy({
        url: "/api/login",
        failOnStatusCode: false,
        method: "POST",
        body: {
          email: userAdmin.user.email,
          password: userAdmin.user.password,
        },
      }).then((response) => {
        expect(response.status).to.equal(200);
      });
      cy.getCookie("connect.sid").then((cook) => {
        cookie_connect_sid = `${cook.name}=${cook.value}`;
      }); 
});
it("change password", ()=> {
    cy.request({
        metod: "PUT",
        headers: {
          Cookie: cookie_connect_sid,
        },
        url: "/api/account/password",
          body: { password: newPassword },
      }).then((response) => {
        expect(response.status).to.eq(200);
      });
      cy.visit("https://santa-secret.ru");
      cy.login(userAdmin, newPassword);
});
after("password reset to initial value - UI - OOP", () => {
    cy.request({
        metod: "PUT",
        headers: {
          Cookie: cookie_connect_sid,
        },
        url: "/api/account/password",
          body: { password: userAdmin.user.password },
      }).then((response) => {
        expect(response.status).to.eq(200);
      });
      cy.visit("https://santa-secret.ru");
      cy.login(userAdmin.user.email, userAdmin.user.password);
  });
});