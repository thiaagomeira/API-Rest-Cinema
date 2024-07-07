import { Segments, Joi } from 'celebrate';

export const movieSchema = {
  [Segments.BODY]: Joi.object({
    image: Joi.string().uri().required().messages({
      'string.uri': '"image" deve ser uma URL válida',
      'any.required': '"image" é obrigatório',
    }),
    name: Joi.string().required().messages({
      'any.required': '"name" é obrigatório',
    }),
    description: Joi.string().required().max(100).messages({
      'any.required': '"description" é obrigatório',
      'string.max': '"description" deve ter no máximo {#limit} caracteres',
    }),
    actors: Joi.array()
      .items(Joi.string().required())
      .min(1)
      .required()
      .messages({
        'array.base': '"actors" deve ser um array',
        'array.min': '"actors" deve conter pelo menos 1 ator',
        'any.required': '"actors" é obrigatório',
      }),
    genre: Joi.string().required().messages({
      'any.required': '"genre" é obrigatório',
    }),
    release_date: Joi.string()
      .regex(/^\d{2}\/\d{2}\/\d{4}( \d{2}:\d{2}:\d{2})?$/)
      .required()
      .messages({
        'any.required': '"release_date" é obrigatório',
        'string.pattern.base':
          'O campo release_date deve estar no formato DD/MM/YYYY HH:mm:ss ou DD/MM/YYYY',
      }),
  }),
};
