import Joi from "@hapi/joi";

export const SigninValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string()
      .required()
      .email({ tlds: { allow: false } }),
    password: Joi.string().required().min(8),
  });
  return schema.validate(data);
};
