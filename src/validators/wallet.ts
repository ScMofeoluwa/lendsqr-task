import Joi from "joi";

class WalletValidator {
  fund() {
    return Joi.object({
      amount: Joi.number().min(1).required(),
    });
  }

  transfer() {
    return Joi.object({
      username: Joi.string().min(5).max(50).required(),
      amount: Joi.number().min(1).required(),
    });
  }

  withdraw() {
    return Joi.object({
      name: Joi.string().min(5).max(50).required(),
      amount: Joi.number().min(1).required(),
      account: Joi.string().required(),
      reason: Joi.string().optional(),
    });
  }
}

export default new WalletValidator();
