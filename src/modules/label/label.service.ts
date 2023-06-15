import { BadRequest, NotFound } from '../../errors';
import { ValidatorService } from '../../public/service';
import { ILabelRepository, ILabelService, InputLabelType } from './interface';

import {
  DeleteLabelSchema,
  GetLabelSchema,
  NewLabelSchema,
  UpdateLabelSchema
} from './schema';

export class LabelService implements ILabelService {
  constructor(private readonly _labelRepo: ILabelRepository) {}

  async newLabel(input: InputLabelType.NewLabel) {
    // validate input
    const validate = new ValidatorService<InputLabelType.NewLabel>(input).validate(
      NewLabelSchema
    );
    if (typeof validate == 'string') throw new BadRequest(validate);
    else input = validate;

    // create a label
    return await this._labelRepo.create(input);
  }

  async getLabel(input: InputLabelType.GetLabel) {
    // validate input
    const validate = new ValidatorService<InputLabelType.GetLabel>(input).validate(
      GetLabelSchema
    );
    if (typeof validate == 'string') throw new BadRequest(validate);
    else input = validate;

    return await this._labelRepo.get(input);
  }

  async updateLabel(input: InputLabelType.UpdateLabel) {
    // validate input
    const validate = new ValidatorService<InputLabelType.UpdateLabel>(input).validate(
      UpdateLabelSchema
    );
    if (typeof validate == 'string') throw new BadRequest(validate);
    else input = validate;

    // check label exists
    const label = await this._labelRepo.findById(input.labelId);
    if (!label || label.author != input.author) {
      throw new NotFound('label not found');
    }

    // update label
    return await this._labelRepo.update(input);
  }

  async deleteLabel(input: InputLabelType.DeleteLabel) {
    // validate input
    const validate = new ValidatorService<InputLabelType.DeleteLabel>(input).validate(
      DeleteLabelSchema
    );
    if (typeof validate == 'string') throw new BadRequest(validate);
    else input = validate;

    // check label exists
    const label = await this._labelRepo.findById(input.labelId);
    if (!label || label.author != input.author) {
      throw new NotFound('label not found');
    }

    // check merg label exists
    if (input.mergeTo) {
      const merg = await this._labelRepo.findById(input.mergeTo);
      if (!merg || input.mergeTo != merg.author) {
        throw new NotFound('merg label is not found');
      }
    }
    await this._labelRepo.delete(input);
  }
}
