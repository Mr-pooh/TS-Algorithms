import { testUrl } from "../../src/constants/testConstant";

describe("app is available", function () {
  it("app should be available on localhost:3000", function () {
    cy.visit(testUrl);
  });
});
