const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { validPassword, createPassword } = require("../../utils/passwordUtil");
const logger = require("../../utils/logger");

module.exports = (usersDao) => {
  const customFields = {
    usernameField: "email",
    passReqToCallback: true,
  };

  const loginCallback = async (req, email, password, done) => {    
    try {      
      const user = await usersDao.findUserByEmail(email);
      if (!user) {
        return done(null, false);
      }

      const isValid = await validPassword(password, user.password);

      if (isValid) {
        return done(null, user);
      } else {
        logger.info("Contraseña incorrecta");
        return done(null, false);
      }
    } catch (err) {
      done(err);
    }
  };

  const signUpCallback = async (req, email, password, done) => {    
    try {    
      const user = await usersDao.findUserByEmail(email);
      if (user) {
        return done(
          null,
          false,
          logger.info("mensaje:", "Hay un usuario registrado con su mail")
        );
      } else {
        const { firstName, lastName, email, age, phone, address } = req.body;   
        const newUser = {
          email: email,
          first_name: firstName,
          last_name: lastName,
          phone: phone,
          age: age,
          address: address,
          avatarUrl: `/images/usersAvatar/${req.file.filename}`,
          password: await createPassword(password),
        };
        const newCreatedUser = await usersDao.addUser(newUser);

        return done(null, newCreatedUser);
      }
    } catch (err) {
      done(err);
    }
  };

  const loginStrategy = new LocalStrategy(customFields, loginCallback);
  const signUpStrategy = new LocalStrategy(customFields, signUpCallback);

  passport.use("login", loginStrategy);
  passport.use("signup", signUpStrategy);
};
