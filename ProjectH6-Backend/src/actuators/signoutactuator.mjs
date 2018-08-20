/**
 * Project H6 Backend Template
 *
 * @author Xu Lian (xu.lian@uts.edu.au)
 */
import Actuator, { wrap } from '../core/actuator';

class SignOutActuator extends Actuator {
  static get is() { return 'actuator-sign-out' }

  constructor(request, response) {
    super(request, response);
    this.invalidSession();
    response.sendStatus(200);
  }
}

export default (request, response) => wrap(request, response, SignOutActuator);
