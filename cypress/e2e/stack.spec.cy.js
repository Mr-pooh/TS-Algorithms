import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import { testUrl, testCirlce } from "../../src/constants/testConstant";

describe("Stack", () => {
  it("if input null to button add disabled", () => {
    cy.visit(`${testUrl}/stack`);
    cy.get("input")
      .should("be.empty")
      .then(() => {
        cy.get("[data-testid='btnAddStack']").should("be.disabled");
      });
  });
  it("correct add element", () => {
    const testElem = "test";
    const testArr = ["test"];
    cy.visit(`${testUrl}/stack`);

    cy.get("input").type(testElem);
    cy.get("[data-testid='btnAddStack']")
      .click()
      .then(() => {
        cy.get(testCirlce).each(($el, index, $list) => {
          cy.get($list).should("have.length", 1);
          cy.get($el).contains(testArr[index]);
          cy.get($el).should("have.css", "border-color", "rgb(210, 82, 225)");
          cy.wait(SHORT_DELAY_IN_MS);
          cy.get($list).should("have.length", 1);
          cy.get($el).contains(testArr[index]);
          cy.get($el).should("have.css", "border-color", "rgb(0, 50, 255)");
        });
      });
    });
    it("correct delete element", () => {
      const testElem = "test";
      cy.visit(`${testUrl}/stack`);

      cy.get("input").type(testElem);
      cy.get("[data-testid='btnAddStack']").click();
      cy.get(testCirlce).contains(testElem);
      cy.wait(SHORT_DELAY_IN_MS);
      cy.get("[data-testid='btnDeleteStack']").click().then(()=> {
        cy.get(testCirlce).each(($el, index, $list) => {
            cy.get($list).should("have.length", 1);
            cy.get($el).contains(testElem);
            cy.get($el).should("have.css", "border-color", "rgb(210, 82, 225)");
            cy.wait(SHORT_DELAY_IN_MS);
            cy.get($list).should("have.length", 0);
          });
      })
    });
    it('correct clear contain', ()=> {
        
      const testElem = "test";
      const testArr = ["test", "test"]
      cy.visit(`${testUrl}/stack`);
      cy.get("input").type(testElem);
      cy.get("[data-testid='btnAddStack']").click();
      cy.get("input").type(testElem);
      cy.get("[data-testid='btnAddStack']").click();
      cy.wait(SHORT_DELAY_IN_MS);
      cy.get(testCirlce).each(($el, index, $list)=>{
        cy.get($list).should("have.length", 2);
            cy.get($el).contains(testArr[index]);
      })
      cy.get("[data-testid='btnClearStack'").click().then(()=> {
        cy.get(testCirlce).should("have.length", 0)
      })

    })
});
