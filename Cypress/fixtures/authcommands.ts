// cypress/support/authcommands.ts

// cypress/support/authcommands.ts

  Cypress.Commands.add('loginToNetCourier', () => {
  cy.fixture('userscreen.json').then((data) => {
    const login = data.login;
   

    cy.visit(login.url);
    cy.get('#access_code').type(login.accessCode);
    cy.get('#login').type(login.username);
    cy.get('#j_password').type(login.password);
    cy.contains('button', 'Sign in').click();
  });
});
Cypress.Commands.add('visitUserScreen', () => {
  cy.visit('https://arena.netcourier.net/netcourier-data/v2/system/user/');
});

 Cypress.Commands.add('selectUserType', (userType: 'Standard'| 'Handheld' | 'Both') => {
  cy.get(`label[for="${userType}"]`).click();
  cy.get(`#${userType}`).should('be.checked');
});

Cypress.Commands.add('selectVehicleType', (vehicle: string) => {
  cy.get('#vehicleType')
    .should('be.visible')
    .select(vehicle)
    .should('have.value', vehicle);
});

Cypress.Commands.add('fillUserForm', (user) => {
  cy.contains('a', 'User').click(); 

  cy.get('#fullName').clear().type(user.fullName);
  cy.get('#userName').clear().type(user.username);
  cy.get('label[for="Standard"]').click(); 
});

Cypress.Commands.add('fillUserForm1', (user) => {

  cy.get('#fullName').type(user.fullName);
  cy.get('#userName').type(user.username);
  cy.get('#password').type(user.password);
  cy.get('label[for="Standard"]').click(); 
});

Cypress.Commands.add('fillUserForm2', (user) => {

  cy.get('#fullName').type(user.fullName);
  cy.get('#userName').type(user.username);
  cy.get('#password').type(user.password);
  cy.get('#email').clear().type(user.contactEmail);
  cy.get('label[for="Standard"]').click(); 
});

Cypress.Commands.add('fillUserForm3', (user) => {
  if (!user) throw new Error('User data is undefined');

  // Select user type
  if (user.userType) {
    cy.get(`label[for="${user.userType}"]`).click();
  }

  // Fill basic fields
  if (user.fullName) cy.get('#fullName').clear().type(user.fullName);
  if (user.username) cy.get('#userName').clear().type(user.username);
  if (user.password) cy.get('#password').clear().type(user.password);
  if (user.contactEmail) cy.get('#email').clear().type(user.contactEmail);


  if (Array.isArray(user.userPrivilege)) {
    user.userPrivilege.forEach((privilege) => {
  cy.get('textarea.select2-search__field').click().type(privilege, { force: true });

  cy.get('.select2-results__option')
    .contains(privilege)
    .should('be.visible')
    .click({ force: true });
});

  }
});

Cypress.Commands.add('fillUserForm4', (user) => {
  if (!user) throw new Error('User data is undefined');

  

  // Fill basic fields
  cy.get('#fullName').clear().type(user.fullName);
  cy.get('#userName').clear().type(user.username);
  cy.get('#password').clear().type(user.password);
  cy.get('#email').clear().type(user.contactEmail);
  cy.get('#officePhone').clear().type(user.officePhone);
  cy.get('label[for="Standard"]').click(); 

  if (Array.isArray(user.userPrivilege)) {
    user.userPrivilege.forEach((privilege) => {
  cy.get('textarea.select2-search__field').click().type(privilege, { force: true });

  cy.get('.select2-results__option')
    .contains(privilege)
    .should('be.visible')
    .click({ force: true });
});

  }
});






 







