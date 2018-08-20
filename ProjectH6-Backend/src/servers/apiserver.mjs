/**
 * Project H6 Backend Template
 *
 * @author Xu Lian (xu.lian@uts.edu.au)
 */
import Server from '../core/server';
import SignUpActuator from '../actuators/signupactuator';
import SignInActuator from '../actuators/signinactuator';
import SignOutActuator from '../actuators/signoutactuator';
import GetProfileActuator from '../actuators/getprofileactuator';
import ListSamplesActuator from '../actuators/listsamplesactuator';
import GetSampleActuator from '../actuators/getsampleactuator';
import ListReportsActuator from '../actuators/listreportsactuator';
import GetReportActuator from '../actuators/getreportactuator';

export default class APIServer extends Server {
  static get is() { return 'server-api' }

  static get port() { return 7266 }

  static get routes() {
    return {
      '/': {
        get: (request, response, next) => {
          response.send(`APIServer`)
        },
        post: (request, response, next) => {
          response.send(`APIServer`)
        }
      },
      '/user/sign-up': {
        post: (request, response, next) => {
          SignUpActuator(request, response)
        },
      },
      '/user/sign-in': {
        post: (request, response, next) => {
          SignInActuator(request, response)
        }
      },
      '/user/sign-out': {
        post: (request, response, next) => {
          SignOutActuator(request, response)
        },
      },
      '/user/reset-password': {
        post: (request, response, next) => {
          response.send(`reset-password not yet implemented`)
        },
      },
      '/user/profile': {
        get: (request, response, next) => {
          GetProfileActuator(request, response)
        }
      },
      '/samples': {
        get: (request, response, next) => {
          ListSamplesActuator(request, response)
        }
      },
      '/samples/:id': {
        get: (request, response, next) => {
          GetSampleActuator(request, response)
        }
      },
      '/reports': {
        get: (request, response, next) => {
          ListReportsActuator(request, response)
        }
      },
      '/reports/:id': {
        get: (request, response, next) => {
          GetReportActuator(request, response)
        },
      }
    }
  }
}
