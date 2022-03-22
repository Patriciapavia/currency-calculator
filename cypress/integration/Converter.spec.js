import '../support/commands';

describe('convert button should be disabled when page load', () => {
	it('the convert button should be disabled unitil user enter the amount  ', () => {
		cy.visit('http://localhost:3000/');
		cy.get('[name=submission]').should('be.disabled');
	});
});

describe('convert button should be enabled after enter amount', () => {
	it('after input amout button will be enabled', () => {
		cy.visit('http://localhost:3000/');
		cy.findByRole('spinbutton').type(1000);
		cy.get('[name=submission]').should('not.be.disabled');
	});
});

describe('amount input only allow number', () => {
	it('user can input number only on amount field', () => {
		cy.visit('http://localhost:3000/');
		cy.findByRole('spinbutton').type('abcd').type(1000);
		cy.get('[name=amount]').should('have.value', 1000);
	});
});
