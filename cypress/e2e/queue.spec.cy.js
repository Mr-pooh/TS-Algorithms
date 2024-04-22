import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import {
  testCircleContain,
  testCircle,
  testUrl,
} from "../../src/constants/testConstant";

describe("Queue", () => {
  const modifiedColor = "rgb(210, 82, 225)";
  const defaultColor = "rgb(0, 50, 255)";
  const testElem = "test";
  beforeEach(() => {
    cy.visit(`${testUrl}/queue`);
  });

  it("if input null to button add disabled", () => {
    cy.get("input")
      .should("be.empty")
      .then(() => {
        cy.get("[data-testid='btnAddQueue']").should("be.disabled");
      });
  });
  it("correct add element", () => {
    cy.get(testCircle).each(($el) => {
      cy.get($el).first().should("have.css", "border-color", defaultColor);
    });

    cy.get("input").type(testElem);
    cy.get("[data-testid='btnAddQueue']").click();
    cy.get(testCircle).eq(0).should("have.css", "border-color", modifiedColor);
    cy.get(testCircleContain).eq(0).contains("head");
    cy.get(testCircleContain).eq(0).contains("tail");
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(testCircle).eq(0).should("have.css", "border-color", defaultColor);

    cy.get("input").type(testElem);
    cy.get("[data-testid='btnAddQueue']").click();
    cy.get(testCircle).eq(1).should("have.css", "border-color", modifiedColor);
    cy.get(testCircleContain).eq(0).contains("head");
    cy.get(testCircleContain).eq(1).contains("tail");
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(testCircle).eq(1).should("have.css", "border-color", defaultColor);
  });
  it("correct delete element", () => {
    cy.get(testCircle).each(($el) => {
      cy.get($el).first().should("have.css", "border-color", defaultColor);
    });

    cy.get("input").type(testElem);
    cy.get("[data-testid='btnAddQueue']").click();
    cy.get(testCircle).eq(0).should("have.css", "border-color", modifiedColor);
    cy.get(testCircleContain).eq(0).contains("head");
    cy.get(testCircleContain).eq(0).contains("tail");
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(testCircle).eq(0).should("have.css", "border-color", defaultColor);

    cy.get("input").type(testElem);
    cy.get("[data-testid='btnAddQueue']").click();
    cy.get(testCircle).eq(1).should("have.css", "border-color", modifiedColor);
    cy.get(testCircleContain).eq(0).contains("head");
    cy.get(testCircleContain).eq(1).contains("tail");
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(testCircle).eq(1).should("have.css", "border-color", defaultColor);

    cy.get("[data-testid='btnDeleteQueue']").click();
    cy.get(testCircle).eq(0).should("have.css", "border-color", modifiedColor);
    cy.get(testCircleContain).eq(1).contains("head");
    cy.get(testCircleContain).eq(1).contains("tail");
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(testCircle).eq(0).should("have.css", "border-color", defaultColor);
    cy.get("[data-testid='btnDeleteQueue']").click();
    cy.get(testCircle).eq(1).should("have.css", "border-color", modifiedColor);
    cy.get(testCircleContain).eq(1).not("head");
    cy.get(testCircleContain).eq(1).not("tail");
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(testCircle).eq(1).should("have.css", "border-color", defaultColor);
  });
  it("correct clear elements", () => {
    cy.get("input").type(testElem);
    cy.get("[data-testid='btnAddQueue']").click();
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("input").type(testElem);
    cy.get("[data-testid='btnAddQueue']").click();
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("input").type(testElem);
    cy.get("[data-testid='btnAddQueue']").click();
    cy.get("[data-testid='btnClearQueue']").click();
    cy.get(testCircle).each(($el, index, $list) => {
      expect($list).to.contain("");
    });
  });
});
