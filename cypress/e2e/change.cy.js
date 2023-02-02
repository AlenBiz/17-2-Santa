import { faker } from "@faker-js/faker";
import "@bahmutov/cy-api";

const userAdmin = require("../fixtures/userAdmin.json");

let newPassword = faker.internet.password(8);
let newPassword300 = faker.internet.password(300);
let newPassword1 = faker.internet.password(1);
let newPasswordRU = "РПдцАРПА";
let newPasswordSimbol = "&^%*%%";

let cookie_connect_sid;

describe("change password", () => {
  before("get cookie", () => {
    cy.api({
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

  it("change password newPassword", () => {
    cy.changePasswordAPI(newPassword);
    cy.visit("/login");
    cy.login(userAdmin.user.email, newPassword);
  });
  it("change password newPassword300", () => {
    cy.changePasswordAPI(newPassword300);
    cy.visit("/login");
    cy.login(userAdmin.user.email, newPassword300);
  });
  it("change password newPassword1", () => {
    cy.changePasswordAPI(newPassword1);
    cy.visit("/login");
    cy.login(userAdmin.user.email, newPassword1);
  });
  it("change password newPasswordRU", () => {
    cy.changePasswordAPI(newPasswordRU);
    cy.visit("/login");
    cy.login(userAdmin.user.email, newPasswordRU);
  });
  it("change password newPasswordSimbol", () => {
    cy.changePasswordAPI(newPasswordSimbol);
    cy.visit("/login");
    cy.login(userAdmin.user.email, newPasswordSimbol);
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
    cy.visit("/login");
    cy.login(userAdmin.user.email, userAdmin.user.password);
  });
});
