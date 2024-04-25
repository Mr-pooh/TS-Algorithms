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
  buttonDeleteHeadList,
  buttonDeleteTailList,
} from "../../src/constants/testConstant";

describe("List", () => {
  const defaultColor = "rgb(0, 50, 255)";
  const modifiedColor = "rgb(210, 82, 225)";
  const changingColor = "rgb(127, 224, 81)";

  const testElem = "test";
  const testIndex = 2;

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
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(testCircle).first().should("have.css", "border-color", defaultColor);
  });
  it("correct add element in tail", () => {
    cy.get('input[placeholder="Введите значение"]').type(testElem);
    cy.get(buttonAddTailList).click();
    cy.get(testCircleContain).each(($el, index, $list) => {
      cy.get($list).should("have.length", 5);
    });
    cy.get(testCircle).eq(3).should("have.css", "border-color", modifiedColor);
    cy.get(testCircle).eq(3).should("have.text", testElem);
    cy.get(testCircleTail).eq(3).should("not.have.text", "tail");
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(testCircle).eq(4).should("have.css", "border-color", changingColor);
    cy.get(testCircle).eq(4).should("have.text", testElem);
    cy.get(testCircleTail).each(($el, index, $list) => {
      if (index === $list.length - 1) {
        cy.get($el).should("have.text", "tail");
      } else {
        cy.get($el).should("not.have.text", "tail");
      }
    });
  });
  it("correct add element on index", () => {
    cy.get('input[placeholder="Введите значение"]').type(testElem);
    cy.get('input[placeholder="Введите индекс"]').type(testIndex);
    cy.get(buttonAddIndexList).click();

    cy.get(testCircle).each(($el, index, $list) => {
      if (index <= testIndex) {
        cy.get($el).should("have.css", "border-color", modifiedColor);
        cy.wait(SHORT_DELAY_IN_MS);
      }
    });
    cy.get(testCircle)
      .eq(testIndex)
      .should("have.css", "border-color", changingColor);
    cy.get(testCircle).eq(testIndex).should("have.text", testElem);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(testCircle).each(($el, index, $list) => {
      cy.get($list).should("have.length", 5);
      cy.get($el).should("have.css", "border-color", defaultColor);
    });
  });
  it("correct delete element in head", () => {
    cy.get(buttonDeleteHeadList).click();
    cy.get(testCircle).each(($el, index, $list) => {
      cy.get($list).should("have.length", 5);
      if (index === 0) {
        cy.get($el).should("have.css", "border-color", modifiedColor);
      } else if (index === 1) {
        cy.get($el).should("have.text", "");
      }
    });
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(testCircle).each(($el, index, $list) => {
      cy.get($list).should("have.length", 3);
      cy.get($el).should("have.css", "border-color", defaultColor);
    });
    cy.get(testCircleContain).each(($el, index) => {
      if (index === 0) cy.get($el).contains("head");
    });
  });
  it("correct delete element in tail", () => {
    cy.get(buttonDeleteTailList).click();
    cy.get(testCircle).each(($el, index, $list) => {
      cy.get($list).should("have.length", 5);
      if (index === $list.length - 2) {
        cy.get($el).should("have.css", "border-color", modifiedColor);
      } else if (index === $list.length - 1) {
        cy.get($el).should("have.text", "");
      }
    });
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(testCircle).each(($el, index, $list) => {
      cy.get($list).should("have.length", 3);
      cy.get($el).should("have.css", "border-color", defaultColor);
    });
    cy.get(testCircleContain).each(($el, index, $list) => {
      if (index === $list.length - 1) {
        cy.get($el).contains("tail");
      }
    });
  });
  it("correct delete element on index", () => {
    cy.get('input[placeholder="Введите индекс"]').type(testIndex);
    cy.get(buttonDeleteIndexList).click();
    cy.get(testCircle).each(($el, index, $list) => {
      cy.get($list).should("have.length", 4);
      if (index <= testIndex) {
        cy.get($el).should("have.css", "border-color", modifiedColor);
        cy.wait(SHORT_DELAY_IN_MS);
      }
    });
    cy.get(testCircle)
      .eq(testIndex + 1)
      .should("have.text", "");
    cy.get(testCircle)
      .eq(testIndex)
      .should("have.css", "border-color", modifiedColor);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(testCircle).each(($el, index, $list) => {
      cy.get($list).should("have.length", 3);

      cy.get($el).should("have.css", "border-color", defaultColor);
    });
  });
});
