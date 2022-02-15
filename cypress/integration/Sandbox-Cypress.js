/// <reference types="cypress" />

import { pageData } from "../Data/PageData";
import { pageLocators } from "../Locators/pageLocators";

describe("Cypress sandbox", () => {
    it("Verify that the artical number shown", () => {
        cy.visit(pageData.URl, { timeout: 30000 }) // Visite the web URL
        cy.get(pageLocators.SearchField, { timeout: 10000 }).type(pageData.searchQuery).wait(2000) // Get the Search field and enter text
        cy.xpath(pageLocators.searchButton).click() // Click on the Search button
        cy.wait(2000)
        cy.xpath(pageLocators.recordlist, { timeout: 5000 }).click() // Click on the articals present on the list
        const CloseButton = pageLocators.closeButton
        cy.get('body').then((body) => {
            if (body.find('svg[data-key="close"]').length > 0) {
                cy.xpath(pageLocators.closeButton, { timeout: 5000 }).click() // Click on the pop-up close button if is it appears
            }
        })
        cy.get('body').should('contain.text', 'Article Number', '1016') // Verifing the artical number and lable present or not
        cy.title().should('be.eq', pageData.searchQuery); // Verifing page title is same as the artical title
    })

    it("Verify that the mail sent to the support team successfully", () => {
        cy.visit(pageData.URl, { timeout: 30000 }) // Visite the web URL
        cy.get(pageLocators.contactSupportButton, { timeout: 5000 }).click() // Click on the contact support button
        cy.xpath(pageLocators.subjectField, { timeout: 10000 }).type(pageData.SubjectName) // Get the subject field and enter the Subject
        cy.wait(1000)
        cy.xpath(pageLocators.descriptionField, { timeout: 5000 }).type(pageData.description) // Get the description field and enter the description
        cy.xpath(pageLocators.emailField).type(pageData.email) // Get the email field and enter the email
        cy.xpath(pageLocators.submitButton).click() // Click on the Submit button
        cy.contains(pageData.supportConfirmationMessage) // Verifing the text is present or not
    })
})