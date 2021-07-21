import Validator from 'validatorjs';

import {
  InvalidParams,
} from '@app/concerns/Exceptions';

export default class BaseController {

  validateParams(params, rules) {
    const validation = new Validator(params, rules);

    if (validation.fails()) {
      throw new InvalidParams(validation);
    };

    return params;
  }

  renderWith(object, opts = {}) {
    const optValues = {status: 200, ...opts};
    const ObjectSerializer = optValues.serializer;
    const body = ObjectSerializer ?
      ObjectSerializer.serializer(object) : object;

    this.ctx.status = optValues.status;

    if (optValues.meta) {
      this.ctx.body = {
        data: body,
        meta: optValues.meta,
      };

    } else {
      this.ctx.body = body;
    }
  }

  renderNotFound() {
    return this.renderWith({status: 'not_found'}, {status: 404});
  }

}
