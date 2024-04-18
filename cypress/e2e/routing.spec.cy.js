import { testUrl } from "../../src/constants/testConstant";

describe("Routing in agloshosh", () => {
  it("fibonacci", () => {
    cy.visit(`${testUrl}/fibonacci`);
  });
  it("string", () => {
    cy.visit(`${testUrl}/recursion`);
  });
  it("sorting", () => {
    cy.visit(`${testUrl}/sorting`);
  });
  it("stack", () => {
    cy.visit(`${testUrl}/stack`);
  });
  it("queue", () => {
    cy.visit(`${testUrl}/queue`);
  });
  it("list", () => {
    cy.visit(`${testUrl}/list`);
  });
});
