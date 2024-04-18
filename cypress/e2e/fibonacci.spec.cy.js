import { testUrl, testCirlce } from "../../src/constants/testConstant";
import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";

describe("Fibonacci", () => {
  it("if input null to button add disabled", () => {
    cy.visit(`${testUrl}/fibonacci`);
    cy.get("input")
      .should("be.empty")
      .then(() => {
        cy.get("button[type=submit]").should("be.disabled");
      });
  });
  it("correct generating numbers", () => {
    const testNum = 6;
    const testArr = [1, 1, 2, 3, 5, 8, 13];
    cy.visit(`${testUrl}/fibonacci`);
    cy.get("input").type(testNum);
    cy.get("button[type=submit]").click();
    for (let i = 0; i < testArr.length; i++) {
      cy.wait(SHORT_DELAY_IN_MS);
      cy.get(testCirlce).contains(testArr[i]);
    }
  });
});
