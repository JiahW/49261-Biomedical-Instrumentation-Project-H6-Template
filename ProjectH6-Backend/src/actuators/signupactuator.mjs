/**
 * Project H6 Backend Template
 *
 * @author Xu Lian (xu.lian@uts.edu.au)
 */
import Actuator, { wrap } from '../core/actuator';
import { securePassword } from '../core/cryptography';
import Errors from '../core/errors';
import User from '../db/models/user';
import Profile from '../db/models/profile';
import Session from '../db/models/session';
import moment from 'moment';

class SignUpActuator extends Actuator {
  static get is() { return 'actuator-sign-up' }

  constructor(request, response) {
    super(request, response);

    const { user, profile } = request.body;
    User.find({ username: user.username }, (error, users) => {
      if (error) {
        console.error(error);
        return response.json({ error: Errors.Internal });
      }

      if (users.length != 0) { // Check if there is a user associated with given username in the database
        return response.json({ error: Errors.Duplicate });
      }

      let u = new User({
        username: user.username,
        password: securePassword(user.password)
      });
      u.save((error, u) => {
        if (error) {
          console.error(error);
          return response.json({ error: Errors.Internal });
        }

        let p = new Profile({
          user: {
            _id: u._id
          },
          firstname: profile.firstname,
          lastname: profile.lastname,
          gender: profile.gender,
          birthday: profile.birthday,
          email_address: profile.email_address,
          telephone_number: profile.telephone_number
        });
        p.save((error, p) => {
          if (error) {
            console.error(error);
            return response.json({ error: Errors.Internal });
          }

          u.profile = { _id: p._id };
          u.save();

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
      });
    });
  }
}

export default (request, response) => wrap(request, response, SignUpActuator);
