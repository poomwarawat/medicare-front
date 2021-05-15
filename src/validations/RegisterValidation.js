import Joi from "@hapi/joi";
export const registerValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string()
      .required()
      .email({ tlds: { allow: false } }),
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    gender: Joi.number().required(),
    birthday: Joi.date().required(),
    password: Joi.string().required().min(8),
    repassword: Joi.string().required().min(8),
  });
  return schema.validate(data);
};
