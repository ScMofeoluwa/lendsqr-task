import Joi from "joi";

class WalletValidator {
  fund() {
    return Joi.object({
      email: Joi.string().min(5).max(255).email().required(),
      amount: Joi.string().required(),
    });
  }

  transfer() {
    return Joi.object({
      username: Joi.string().min(5).max(50).required(),
      amount: Joi.string().required(),
    });
  }

  withdraw() {
    return Joi.object({
      name: Joi.string().min(5).max(50).required(),
      amount: Joi.string().required(),
      account: Joi.string().required(),
      reason: Joi.string().optional(),
    });
  }
}

export default new WalletValidator();
