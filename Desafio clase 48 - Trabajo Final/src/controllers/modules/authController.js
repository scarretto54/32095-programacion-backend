const logger = require("../../utils/logger");

module.exports = authController = (notificationService) => ({
  logIn(req, res, next) {
    if (req.isAuthenticated()) {
      logger.info("Usuario logueado");
              
      return res.redirect("/productos");
    } else {
      logger.info("Usuario no logueado");
      res.render("pages/logIn");
      return;
    }
  },

  logOut(req, res, next) {
    try {
      logger.info("Ingresó a Logout");
      req.logout();
      res.render("partials/logOut");
    } catch (error) {
      logger.error(error);
    }
  },

  signUp(req, res, next) {    
    res.render("pages/signUp");
  },

  async newUserSignup(req, res) {  
    await notificationService.alertNewUser(req.user);
    res.redirect("/productos");
  },

  failureSignUp(req, res, next) {
    res.render("partials/failureSignUp");
  },

  failureLogIn(req, res, next) {
    res.render("partials/failureLogIn");
  },
});
