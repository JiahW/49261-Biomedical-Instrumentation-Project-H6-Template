/**
 * Project H6 Backend Template
 *
 * @author Xu Lian (xu.lian@uts.edu.au)
 */
import Actuator, { wrap } from '../core/actuator';
import Errors from '../core/errors';
import Report from '../db/models/report';

class ListReportsActuator extends Actuator {
  static get is() { return 'actuator-list-report' }

  constructor(request, response) {
    super(request, response);

    this.getSession((s) => {
      if (s === null) {
        return response.json({ error: Errors.Unauthorized });
      }

      Report.find({ user: s.user }, (error, reports) => {
        if (error) {
          console.error(error);
          return response.json({ error: Errors.Internal });
        }

        let data = [];
        for (let r of reports) {
          let samples = [];
          for (let sa of r.samples) {
            samples.push({
              id: sa._id
            });
          }
          data.push({
            id: r._id,
            samples: samples,
            created: r.created,
            updated: r.updated
          });
        }

        response.json({
          reports: data
        })
      });
    });
  }
}

export default (request, response) => wrap(request, response, ListReportsActuator);
