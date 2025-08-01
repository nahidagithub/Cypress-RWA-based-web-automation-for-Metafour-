// cypress/support/authcommands.d.ts

declare global {
  namespace Cypress {
    interface Chainable {
      loginToNetCourier(): Chainable<void>;
      visitUserScreen(): Chainable<void>;
     selectUserType(userType: 'Handheld' | 'Both'): Chainable<void>;
      selectVehicleType(vehicle: string): Chainable<void>;
      selectUserType(userType: 'Standard'| 'Handheld' | 'Both'): Chainable<void>;
      selectVehicleType(vehicle: string): Chainable<void>;
      fillUserForm(user: {
      fullName: string;
      username: string;
      userType: string;
      password: string;
    }): Chainable<void>;
    
    
    fillUserForm1(user: {
      userType: string;
      fullName: string;
      username: string;
      password: string;
    }): Chainable<void>;

    fillUserForm2(user: {
      userType: string;
      fullName: string;
      username: string;
      password: string;
      contactEmail: string;
      userPrivilege: string[];
    }): Chainable<void>;

    fillUserForm3(user: {
      userType: string;
      fullName: string;
      username: string;
      password: string;
      contactEmail: string;
      userPrivilege: string[];
    }): Chainable<void>;

     fillUserForm4(user: {
      userType: string;
      fullName: string;
      username: string;
      password: string;
      contactEmail: string;
      officePhone: string;
      userPrivilege: string[];
    }): Chainable<void>;

    }
   

  }
   
}



export {};
