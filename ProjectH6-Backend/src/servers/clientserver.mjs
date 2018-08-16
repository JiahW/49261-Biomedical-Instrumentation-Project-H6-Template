/**
 * Project H6 Backend Template
 *
 * @author Xu Lian (xu.lian@uts.edu.au)
 */
import Server from '../core/server';

export default class ClientServer extends Server {
  static get is() { return 'server-client' }

  static get port() { return 7260 }

  static get routes() {
    return {
      '/static': {
        static: `${ this.publicDirectory }/static`
      },
      '/favicon.ico': {
        get: (request, response, next) => {
          response.sendFile(`${ this.publicDirectory }/favicon.ico`)
        }
      },
      '/*': {
        get: (request, response, next) => {
          response.sendFile(`${ this.publicDirectory }/index.html`)
        }
      }
    }
  }
}
