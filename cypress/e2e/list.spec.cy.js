import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import {
  buttonAddHeadList,
  buttonAddIndexList,
  buttonAddTailList,
  buttonDeleteIndexList,
  testArrowElement,
  testCircleContain,
  testCircleHead,
  testCircleIndex,
  testCircleLetter,
  testCircleTail,
  testCircle,
  testUrl,
} from "../../src/constants/testConstant";

describe("List", () => {
  const defaultColor = "rgb(0, 50, 255)";
  const modifiedColor = "rgb(210, 82, 225)";
  const changingColor = "rgb(127, 224, 81)";

  const testElem = "test";

  beforeEach(() => {
    cy.visit(`${testUrl}/list`);
  });
  it("if input null to buttonAdd, buttonAddIndex and buttonDeleteIndex disabled", () => {
    cy.get('input[placeholder="Введите значение"]').should("be.empty");
    cy.get(buttonAddHeadList).should("be.disabled");
    cy.get(buttonAddTailList).should("be.disabled");

    cy.get('input[placeholder="Введите индекс"]').should("be.empty");
    cy.get(buttonAddIndexList).should("be.disabled");
    cy.get(buttonDeleteIndexList).should("be.disabled");
  });
  it("correct render default list", () => {
    cy.get(testCircle).each(($el, index, $list) => {
      cy.get($list).should("have.length", 4);
      cy.get($el).should("have.css", "border-color", defaultColor);
    });

    cy.get(testCircleIndex).each(($el, index, $list) => {
      cy.get($el).should("have.text", index);
    });

    cy.get(testCircleHead).each(($el, index, $list) => {
      if (index === 0) {
        cy.get($el).should("have.text", "head");
      } else {
        cy.get($el).should("not.have.text", "head");
      }
    });
    cy.get(testCircleTail).each(($el, index, $list) => {
      if (index !== $list.length - 1) {
        cy.get($el).should("not.have.text", "tail");
      } else {
        cy.get($el).should("have.text", "tail");
      }
    });

    cy.get(testCircleLetter).each(($el, index) => {
      cy.get($el).should("be.not.empty");
    });

    cy.get(testArrowElement).each(($el, index, $list) => {
      cy.get($list).should("have.length", 3);
      cy.get($el).should("exist");
    });
  });
  it("correct add element in head", () => {
    cy.get('input[placeholder="Введите значение"]').type(testElem);
    cy.get(buttonAddHeadList).click();
    cy.get(testCircleHead).each(($el, index, $list) => {
      cy.get($el).should("not.have.text", "head");
    });

    cy.get(testCircle).each(($el, index, $list) => {
      cy.get($list).should("have.length", 5);
    });
    cy.get(testCircle).first().should("have.text", testElem);
    cy.get(testCircle)
      .first()
      .should("have.css", "border-color", modifiedColor);

    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(testCircle)
      .first()
      .should("have.css", "border-color", changingColor);
    cy.get(testCircleContain).each(($el, index, $list) => {
      cy.get($list).should("have.length", 5);
    });
    cy.get(testCircleHead).each(($el, index, $list) => {
      if (index === 0) {
        cy.get($el).should("have.text", "head");
      } else {
        cy.get($el).should("not.have.text", "head");
      }
    });
    cy.wait(SHORT_DELAY_IN_MS)
    cy.get(testCircle)
      .first()
      .should("have.css", "border-color", defaultColor);
  });
});
