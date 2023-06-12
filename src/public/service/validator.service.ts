import { Schema } from 'joi';
import { IValidatorService } from './interface';

export class ValidatorService<T> extends IValidatorService<T> {
  public validate(schema: Schema): T | string {
    const { error, value } = schema.validate(this.input);
    if (error) return error.details[0].message;
    else return value;
  }
}
