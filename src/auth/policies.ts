export const b2cPolicies = {
  names: {
    signIn: "B2C_1_sign_in",
    signUpSignIn: "B2C_1_signup_signin",
    forgotPassword: "B2C_1_reset",
    editProfile: "B2C_1_edit",
  },
  authorities: {
    signIn: {
      authority:
        "https://CmandrApp.b2clogin.com/CmandrApp.onmicrosoft.com/B2C_1_sign_in",
    },
    signUpSignIn: {
      authority:
        "https://CmandrApp.b2clogin.com/CmandrApp.onmicrosoft.com/B2C_1_signup_signin",
    },
    forgotPassword: {
      authority:
        "https://CmandrApp.b2clogin.com/CmandrApp.onmicrosoft.com/B2C_1_reset",
    },
    editProfile: {
      authority:
        "https://CmandrApp.b2clogin.com/CmandrApp.onmicrosoft.com/B2C_1_edit",
    },
  },
  authorityDomain: "CmandrApp.b2clogin.com",
};
