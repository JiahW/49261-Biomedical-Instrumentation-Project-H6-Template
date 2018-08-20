/**
 * Project H6 Backend Template
 *
 * @author Xu Lian (xu.lian@uts.edu.au)
 */
import Actuator, { wrap } from '../core/actuator';
import { securePassword } from '../core/cryptography';
import Errors from '../core/errors';
import User from '../db/models/user';
import Session from '../db/models/session';
import moment from 'moment';

class SignInActuator extends Actuator {
  static get is() { return 'actuator-sign-in' }

  constructor(request, response) {
    super(request, response);

    const { user, persistent } = request.body;

    User.find({ username: user.username }, (error, users) => {
      if (error) {
        console.error(error);
        return response.json({ error: Errors.Internal });
      }

      if (users.length == 0) { // Check if there is a user associated with given username in the database
        return response.json({ error: Errors.NotFound });
      }

      let u = users[0];
      if (u.password !== securePassword(user.password)) { // Verify password
        return response.json({ error: Errors.PasswordMismatch });
      }

      let s = new Session({
        user: {
          _id: u._id
        },
        profile: u.profile,
        expired: moment().add(20, 'years').toDate(),
      });
      s.save((error, s) => {
        if (error) {
          console.error(error);
          return response.json({ error: Errors.Internal });
        }

        this.updateSession(s);

        response.json({
          session: {
            id: s._id
          },
          user: {
            id: u._id
          }
        });
      });
    });
  }
}

export default (request, response) => wrap(request, response, SignInActuator);
