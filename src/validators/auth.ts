import Joi from "joi";

class AuthValidator {
  register() {
    return Joi.object({
      username: Joi.string().min(5).max(50).required(),
      email: Joi.string().min(5).max(255).email().required(),
      password: Joi.string().min(5).max(255).required(),
    });
  }

  login() {
    return Joi.object({
      email: Joi.string().min(5).max(255).email().required(),
      password: Joi.string().min(5).max(255).required(),
    });
  }
}

export default new AuthValidator();
