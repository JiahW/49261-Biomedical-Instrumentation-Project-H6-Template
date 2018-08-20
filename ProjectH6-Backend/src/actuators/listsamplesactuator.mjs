/**
 * Project H6 Backend Template
 *
 * @author Xu Lian (xu.lian@uts.edu.au)
 */
import Actuator, { wrap } from '../core/actuator';
import Errors from '../core/errors';
import Sample from '../db/models/sample';

class ListSamplesActuator extends Actuator {
  static get is() { return 'actuator-list-samples' }

  constructor(request, response) {
    super(request, response);

    this.getSession((s) => {
      if (s === null) {
        return response.json({ error: Errors.Unauthorized });
      }

      Sample.find({ user: s.user }, (error, samples) => {
        if (error) {
          console.error(error);
          return response.json({ error: Errors.Internal });
        }

        let data = [];
        for (let sa of samples) {
          data.push({
            id: sa._id,
            agent: sa.agent,
            created: sa.created,
            updated: sa.updated
          });
        }

        response.json({
          samples: data
        })
      });
    });
  }
}

export default (request, response) => wrap(request, response, ListSamplesActuator);
