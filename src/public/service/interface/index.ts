import { Schema } from 'joi';

export abstract class IValidatorService<T> {
  constructor(protected readonly input: T) {}
  abstract validate(schema: Schema): T | string;
}
