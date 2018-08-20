/**
 * Project H6 Backend Template
 *
 * @author Xu Lian (xu.lian@uts.edu.au)
 */
import Session from '../db/models/session';
import moment from 'moment';

export default class Actuator {
  static get is() { return 'actuator' }

  constructor(request, response) {
    this._request = request;
    this._response = response;
  }

  getSession(callback) {
    let cookies = this._request.signedCookies;
    let { session } = cookies;

    if (session) {
      Session.find({ _id: session }, (error, sessions) => {
        if (error) {
          console.error(error);
          callback(null);
        } else if (sessions.length === 0) {
          callback(null);
        } else {
          callback(sessions[0]);          
        }
      });
    } else {
      callback(null);
    }
  }

  updateSession(s) {
    this._response.cookie('session', s._id.toString(), {
      maxAge: 630700000,
      path: '/',
      signed: true,
    });
  }

  invalidSession() {
    if (this.session) {

    }
    //this._response.clearCookie('session');
  }
}

export function wrap(request, response, actuator) {
  console.info(`${ actuator.is } on ${ request.hostname } called for ${ request.method } ${ request.originalUrl } from ${ request.ip }`);
  new actuator(request, response);
}
