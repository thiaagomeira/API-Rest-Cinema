import { Segments, Joi } from 'celebrate';

export const sessionSchema = {
  [Segments.BODY]: Joi.object({
    room: Joi.string().required().messages({
      'any.required': 'room é obrigatório',
    }),
    capacity: Joi.number().integer().positive().required().messages({
      'number.base': 'capacity deve ser um número',
      'number.integer': 'capacity deve ser um número inteiro',
      'number.positive': 'capacity deve ser um número positivo',
      'any.required': 'capacity é obrigatório',
    }),
    day: Joi.string()
      .pattern(/^\d{2}\/\d{2}\/\d{4}$/)
      .required()
      .messages({
        'string.pattern.base': 'day deve estar no formato DD/MM/YYYY',
        'any.required': 'day é obrigatório',
      }),
    time: Joi.string()
      .pattern(/^\d{2}:\d{2}:\d{2}$/)
      .required()
      .messages({
        'string.pattern.base': 'time deve estar no formato HH:MM:SS',
        'any.required': 'time é obrigatório',
      }),
  }),
  [Segments.PARAMS]: Joi.object({
    movie_id: Joi.number().integer().positive().required().messages({
      'number.base': 'movie_id deve ser um número',
      'number.integer': 'movie_id deve ser um número inteiro',
      'number.positive': 'movie_id deve ser um número positivo',
      'any.required': 'movie_id é obrigatório',
    }),
    id: Joi.number().integer().positive().messages({
      'number.base': 'id deve ser um número',
      'number.integer': 'id deve ser um número inteiro',
      'number.positive': 'id deve ser um número positivo',
    }),
  }),
};
