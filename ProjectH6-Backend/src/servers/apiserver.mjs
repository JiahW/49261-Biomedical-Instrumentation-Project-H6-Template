/**
 * Project H6 Backend Template
 *
 * @author Xu Lian (xu.lian@uts.edu.au)
 */
import Server from '../core/server';

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
          response.send(`Sign Up`)
        }
      },
      '/user/sign-in': {
        post: (request, response, next) => {
          response.send(`Sign In`)
        }
      },
      '/user/sign-out': {
        post: (request, response, next) => {
          response.send(`Sign Out`)
        }
      },
      '/user/reset-password': {
        post: (request, response, next) => {
          response.send(`reset-password`)
        }
      },
      '/user/profile': {
        get: (request, response, next) => {
        },
        post: (request, response, next) => {
          response.send(``)
        }
      },
      '/samples/:id': {
        get: (request, response, next) => {
        },
        post: (request, response, next) => {
          response.send(``)
        }
      },
      '/reports/:id': {
        get: (request, response, next) => {
        }
      }
    }
  }
}
