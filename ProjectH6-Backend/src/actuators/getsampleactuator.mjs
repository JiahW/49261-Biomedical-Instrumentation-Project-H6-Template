/**
 * Project H6 Backend Template
 *
 * @author Xu Lian (xu.lian@uts.edu.au)
 */
import Actuator, { wrap } from '../core/actuator';
import Errors from '../core/errors';
import Sample from '../db/models/sample';

class GetSampleActuator extends Actuator {
  static get is() { return 'actuator-get-sample' }

  constructor(request, response) {
    super(request, response);

    this.getSession((s) => {
      if (s === null) {
        return response.json({ error: Errors.Unauthorized });
      }

      const { id } = request.params;

      Sample.find({ _id: id }, (error, samples) => {
        if (error) {
          console.error(error);
          return response.json({ error: Errors.Internal });
        }

        if (samples.length == 0) {
          return response.json({ error: Errors.NotFound });
        }

        const sa = samples[0];

        if (!sa.user._id.equals(s.user._id)) {
          return response.json({ error: Errors.NotFound });
        }

        response.json({
          sample: {
            id: sa._id,
            agent: sa.agent,
            created: sa.created,
            updated: sa.updated
          }
        })
      });
    });
  }
}

export default (request, response) => wrap(request, response, GetSampleActuator);
