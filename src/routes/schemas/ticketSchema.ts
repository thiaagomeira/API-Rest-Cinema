import { Segments, Joi } from 'celebrate';

export const ticketSchema = {
  [Segments.BODY]: Joi.object({
    chair: Joi.string()
      .pattern(/^[a-z]\d$/)
      .required()
      .messages({
        'string.pattern.base':
          'chair deve seguir o padrão: uma letra seguida por um número, por exemplo, a1',
        'any.required': 'chair é obrigatório',
      }),
    value: Joi.number().integer().positive().required().messages({
      'number.base': 'value deve ser um número',
      'number.integer': 'value deve ser um número inteiro',
      'number.positive': 'value deve ser um número positivo',
      'any.required': 'value é obrigatório',
    }),
  }),
};
