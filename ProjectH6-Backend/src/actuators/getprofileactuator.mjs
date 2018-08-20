/**
 * Project H6 Backend Template
 *
 * @author Xu Lian (xu.lian@uts.edu.au)
 */
import Actuator, { wrap } from '../core/actuator';
import Errors from '../core/errors';
import User from '../db/models/user';
import Profile from '../db/models/profile';
import moment from 'moment';

class GetProfileActuator extends Actuator {
  static get is() { return 'actuator-get-profile' }

  constructor(request, response) {
    super(request, response);

    this.getSession((s) => {
      if (s === null) {
        return response.json({ error: Errors.Unauthorized });
      }

      User.find(s.user, (error, users) => {
        if (error) {
          console.error(error);
          return response.json({ error: Errors.Internal });
        }

        if (users.length == 0) { // Check if there is a profile associated with given id in the database
          return response.json({ error: Errors.Internal });
        }

        const u = users[0];

        Profile.find(u.profile, (error, profiles) => {
          if (error) {
            console.error(error);
            return response.json({ error: Errors.Internal });
          }

          if (profiles.length == 0) { // Check if there is a profile associated with given id in the database
            return response.json({ error: Errors.Internal });
          }

          const p = profiles[0];
          response.json({
            user: {
              id: u._id,
              username: u.username
            },
            profile: {
              id: p._id,
              firstname: p.firstname,
              lastname: p.lastname,
              gender: p.gender,
              birthday: moment(p.birthday).format('YYYY-MM-DD'),
              email_address: p.email_address,
              telephone_number: p.telephone_number
            }
          });
        });
      });

    });
  }
}

export default (request, response) => wrap(request, response, GetProfileActuator);
