/**
 * Project H6 Backend Template
 *
 * @author Xu Lian (xu.lian@uts.edu.au)
 */
import Actuator, { wrap } from '../core/actuator';
import Errors from '../core/errors';
import Report from '../db/models/report';

class GetReportActuator extends Actuator {
  static get is() { return 'actuator-get-report' }

  constructor(request, response) {
    super(request, response);

    this.getSession((s) => {
      if (s === null) {
        return response.json({ error: Errors.Unauthorized });
      }

      const { id } = request.params;

      Report.find({ _id: id }, (error, reports) => {
        if (error) {
          console.error(error);
          return response.json({ error: Errors.Internal });
        }

        if (reports.length == 0) {
          return response.json({ error: Errors.NotFound });
        }

        const r = reports[0];

        if (!r.user._id.equals(s.user._id)) {
          return response.json({ error: Errors.NotFound });
        }

        let samples = [];
        for (let sa of r.samples) {
          samples.push({
            id: sa._id
          });
        }

        response.json({
          report: {
            id: r._id,
            samples: samples,
            created: r.created,
            updated: r.updated
          }
        })
      });
    });
  }
}

export default (request, response) => wrap(request, response, GetReportActuator);
