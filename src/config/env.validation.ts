/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as Joi from 'joi';

export const envValidationSchema: Joi.ObjectSchema = Joi.object({
  NODE_ENV: Joi.string().valid('dev', 'prod', 'staging', 'test').default('dev'),
  PORT: Joi.number().default(3001),
  MONGODB: Joi.string().required(),
  DEFAULT_LIMIT: Joi.number().default(7),
});
