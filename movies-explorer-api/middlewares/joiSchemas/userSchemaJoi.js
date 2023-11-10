const { Joi, celebrate } = require('celebrate');

const editProfileSchemaJoi = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        'string.email': 'Некорректный адрес электронной почты!',
        'any.required': 'Поле "email" должно быть заполнено',
      }),
  }),
});

const signupUserSchemaJoi = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        'string.email': 'Некорректный адрес электронной почты!',
        'any.required': 'Поле "email" должно быть заполнено',
      }),
    password: Joi.string().required().messages({
      'any.required': 'Поле "password" должно быть заполнено',
    }),
  }),
});

const signinUserSchemaJoi = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        'string.email': 'Некорректный адрес электронной почты!',
        'any.required': 'Поле "email" должно быть заполнено',
      }),
    password: Joi.string().required().messages({
      'any.required': 'Поле "password" должно быть заполнено',
    }),
  }),
});

module.exports = {
  signupUserSchemaJoi,
  signinUserSchemaJoi,
  editProfileSchemaJoi
};
