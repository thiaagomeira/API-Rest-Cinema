import { Joi, Segments } from 'celebrate';

export const movieSchema = {
  [Segments.BODY]: Joi.object({
    image: Joi.string().uri().required().messages({
      'string.uri': '"image" deve ser uma URL válida',
      'any.required': '"image" é obrigatório',
    }),
    name: Joi.string().required().messages({
      'any.required': '"name" é obrigatório',
    }),
    description: Joi.string().required().messages({
      'any.required': '"description" é obrigatório',
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
    release_date: Joi.string().required().messages({
      'any.required': '"release_date" é obrigatório',
      'any.invalid': '"release_date" deve estar no formato DD/MM/YYYY',
      'date.invalid': '"release_date" deve ser uma data válida',
    }),
  }),
};
