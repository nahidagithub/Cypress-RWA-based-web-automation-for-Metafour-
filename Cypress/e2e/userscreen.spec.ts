// cypress/e2e/userscreen.spec.ts

describe('NetCourier User Screen UI Tests', () => {
  beforeEach(() => {
    cy.loginToNetCourier();
    cy.visitUserScreen();
    
  });

   it('Provide valid password and new user screen will appear', () => {
    cy.url().should('include', '/system/user/');
  });

  it('should verify the presence of elements in the nav bar', () => {
    cy.get('#headerconfirmbutton').contains('Confirm').should('be.visible');
    cy.get('#headercancelbutton').contains('Cancel').should('be.visible');
    cy.get('#current-language').contains('Action').should('be.visible');
    cy.get('.ri-moon-line').should('be.visible');
    cy.get('.form-control').should('be.visible');
    cy.get('img#logo').should('be.visible');
  });

  it('should verify the presence of User, Driver Info, and Tasks in the menu bar', () => {
    cy.contains('a', 'User').should('be.visible');
    cy.contains('a', 'Driver Info').should('be.visible');
    cy.contains('a', 'Tasks').should('be.visible');
  });

  it('should verify the presence of user section fields and components', () => {
    cy.get('#fullName').should('be.visible');
    cy.get('#userName').should('be.visible');
    cy.get('#password').should('be.visible');
    cy.get('#officePhone').should('be.visible');
    cy.get('#extension').should('be.visible');
    cy.get('#mobile').should('be.visible');
    cy.get('#homePhone').should('be.visible');
    cy.get('#email').should('be.visible');
    cy.get('.btn.btn-outline-primary').should('be.visible');
    cy.get('#searchSupplier').should('be.visible');
    cy.get('#productId').should('be.visible');
    cy.get('#productId option').should('have.length.greaterThan', 0);
    cy.get('#productId')
      .children('option')
      .should('contain', 'Export')
      .and('contain', 'Import')
      .and('contain', 'Secure')
      .and('contain', 'Overnight');
    cy.get('#displayRecordsUpto').should('be.visible');
  });

  it('verify the Driver info screen section', () => {
    cy.get('[name="taxStatus"], #taxStatus').should('exist').and('be.visible')
      .find('option').should('have.length.greaterThan', 0);

    cy.get('[name="invoiceEmail"], #invoiceEmail')
      .should('exist').and('be.visible')
      .and('have.attr', 'type', 'email');

    cy.get('[name="invoiceTemplate"], #invoiceTemplate')
      .should('exist').and('be.visible')
      .find('option').should('have.length.greaterThan', 0);

    cy.get('[name="weightUnit"], #weightUnit')
      .should('exist').and('be.visible')
      .find('option').should('include.text', 'KG');

    cy.get('#lengthUnit').should('be.visible').and('match', 'select');

    cy.get('#lengthUnit option')
      .should('contain.text', 'CM')
      .and('contain.text', 'IN');

    cy.get('[name="distanceUnit"], #distanceUnit')
      .should('exist').and('be.visible')
      .find('option').should('include.text', 'KM');

    cy.get('input[name="currency"]').should('be.visible').type('USD');

    cy.get('.dropdown-menu').contains('USD').click();
  });

  it('Should select Handheld and verify it is selected', () => {
    cy.selectUserType('Handheld');
  });

  it('Select handheld button then handheld user type box should be appeared', () => {
    cy.selectUserType('Handheld');
    cy.get('#handheldUserType').should('exist').and('be.visible');
  });

  it('Verify the additional fields under driver info section are visible', () => {
    cy.selectUserType('Handheld');
    cy.get('#driverNumber').should('be.visible');
    cy.get('#driverlicencenumber').should('be.visible');
    cy.get('input[placeholder="Driver licence expiry date"]').should('be.visible');
    cy.get('input[placeholder="Driver licence issue date"]').should('be.visible');
    cy.get('input[placeholder="Insurance expiry date"]').should('be.visible');
    cy.get('input[placeholder="Categories of vehicle licenced"]').should('be.visible');
    cy.get('#vehicleType').should('be.visible');
    cy.get('#vatNo').should('be.visible');
  });

  it('Verify when select Both from user type group, it is selected as user', () => {
    cy.selectUserType('Both');
  });

  it('Check that "current vehicle" field is not in the screen', () => {
    cy.get('#currentVehicle').should('not.be.visible');
  });

  it('Verify selecting vehicle type CAR shows current vehicle field', () => {
    cy.selectUserType('Both');
    cy.selectVehicleType('CAR');

    cy.get('#currentVehicle')
      .should('be.visible')
      .and('have.attr', 'placeholder', 'Search Vehicle');
  });

  it('Driver info section Field Validation', () => {
    cy.selectUserType('Both');
    cy.get('#driverNumber').should('be.visible');
    cy.get('#driverlicencenumber').should('be.visible');
    cy.get('input[placeholder="Driver licence expiry date"]').should('be.visible').and('have.class', 'flatpickr-input');
    cy.get('input[placeholder="Driver licence issue date"]').should('be.visible').and('have.class', 'flatpickr-input');
    cy.get('input[placeholder="Insurance expiry date"]').should('be.visible').and('have.class', 'flatpickr-input');
    cy.get('input[placeholder="Categories of vehicle licenced"]').should('be.visible');
    cy.get('select#vehicleType').should('be.visible');
    cy.get('#vehicleType')
      .should('contain', 'BIKE')
      .and('contain', 'CYCLE')
      .and('contain', 'CAR');
    cy.get('input[placeholder="Driver tax code"]').should('be.visible');
  });

  it('Verify Handheld user type dropdown options', () => {
    cy.selectUserType('Handheld');
    cy.get('#handheldUserType').should('be.visible').within(() => {
      cy.get('option').should('contain.text', 'Employee');
      cy.get('option').should('contain.text', 'Part-time Employee');
      cy.get('option').should('contain.text', 'Sameday driver');
    });
  });

it('should show validation errors when required fields are missing', () => {
  cy.fixture('userscreen').then((data) => {
    cy.fillUserForm(data.newUser[0]); // Fill full name + username only

     cy.get('#headerconfirmbutton').click();


    // Check password field error
    cy.get('#password').should('have.class', 'is-invalid');

    // Check one of the contact fields shows error
    const contactFields = ['#officePhone', '#mobile', '#homePhone', '#email'];
    contactFields.forEach(selector => {
      cy.get(selector).should('have.class', 'is-invalid');
    });
    //user privilege
   cy.get('textarea.select2-search__field')
  .should('be.visible')
  .and('have.attr', 'placeholder', 'Required');

  });
});


  it('should show required field errors for missing contact and privilege', () => {
    cy.fixture('userscreen').then((data) => {
    cy.fillUserForm1(data.newUser[1]);
    cy.get('#headerconfirmbutton').click();

     

      
    const contactFields = ['#officePhone', '#mobile', '#homePhone', '#email'];
    contactFields.forEach(selector => {
    cy.get(selector).should('have.class', 'is-invalid');
    });

      // 1. User privilege (Select2-based)

     cy.get('textarea.select2-search__field')
    .should('be.visible')
    .and('have.attr', 'placeholder', 'Required');

    });

  })

     it('should show required field errors for missing privilege', () => {
     cy.fixture('userscreen').then((data) => {
     cy.fillUserForm2(data.newUser[2]);
     cy.get('#headerconfirmbutton').click();


      // 1. User privilege (Select2-based)

     cy.get('textarea.select2-search__field')
    .should('be.visible')
    .and('have.attr', 'placeholder', 'Required');

    });
  


  it('should successfully add a user with required  fields', () => {
    cy.fixture('userscreen').then((data) => {
      const user = data.newUser[3];

      cy.fillUserForm3(user);
      cy.get('#headerconfirmbutton').click();

    });
  });

   it('should successfully add a user with required fields and office phone', () => {
    cy.fixture('userscreen').then((data) => {
      const user = data.newUser[4];

      cy.fillUserForm4(user);
      cy.get('#headerconfirmbutton').click();
     

    });
  });


   it('should successfully add a user with required fields and office phone', () => {
    cy.fixture('userscreen').then((data) => {
      const user = data.newUser[4];

      cy.fillUserForm4(user);
      cy.get('#headerconfirmbutton').click();

    });
   })
});
});




 

  





    




   

  


    








