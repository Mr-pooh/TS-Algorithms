import { testUrl, testCirlce } from "../../src/constants/testConstant";

import { DELAY_IN_MS } from "../../src/constants/delays";

describe("String testing", () => {
  before(() => {
    cy.visit(`${testUrl}/recursion`);
  });
  it("if input null to button add disabled", () => {
    cy.get("input")
      .should("be.empty")
      .then(() => {
        cy.get("button[type=submit]").should("be.disabled");
      });
  });
  it("should reverse the input string correctly", () => {
    const inputString = "hello";

    const firstStepColorsArr = [
      "rgb(210, 82, 225)",
      "rgb(0, 50, 255)",
      "rgb(0, 50, 255)",
      "rgb(0, 50, 255)",
      "rgb(210, 82, 225)",
    ];

    const inProcessString = "oellh";
    const secondStepColorsArr = [
      "rgb(127, 224, 81)",
      "rgb(210, 82, 225)",
      "rgb(0, 50, 255)",
      "rgb(210, 82, 225)",
      "rgb(127, 224, 81)",
    ];

    const finalString = "olleh";
    const finaStepColorsArr = [
      "rgb(127, 224, 81)",
      "rgb(127, 224, 81)",
      "rgb(127, 224, 81)",
      "rgb(127, 224, 81)",
      "rgb(127, 224, 81)",
    ];

    cy.visit(`${testUrl}/recursion`);
    cy.get("input").type(inputString);
    cy.get("button[type=submit]").click();

    cy.get(testCirlce).each(($el, index, $list) => {
      cy.get($list).should("have.length", inputString.length);
      cy.get($el).contains(inputString[index]);
      cy.get($el).should("have.css", "border-color", firstStepColorsArr[index]);
    });

    cy.wait(DELAY_IN_MS);

    cy.get(testCirlce).each(($el, index, $list) => {
      cy.get($list).should("have.length", inputString.length);
      cy.get($el).contains(inProcessString[index]);
      cy.get($el).should(
        "have.css",
        "border-color",
        secondStepColorsArr[index]
      );
    });

    cy.wait(DELAY_IN_MS);

    cy.get(testCirlce).each(($el, index, $list) => {
      cy.get($list).should("have.length", inputString.length);
      cy.get($el).contains(finalString[index]);
      cy.get($el).should("have.css", "border-color", finaStepColorsArr[index]);
    });
  });
});
