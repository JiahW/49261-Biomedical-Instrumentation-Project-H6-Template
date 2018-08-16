/**
 * Project H6 Backend Template
 *
 * @author Xu Lian (xu.lian@uts.edu.au)
 */
import express from 'express';
import http from 'http';

export default class Server {
  static get is() { return 'server' }

  static get port() { return 8080 }

  static get routes() {
    return {
      '/': {
        get: (request, response, next) => {
          response.send(`Server at ${port}`)
        },
        head: (request, response, next) => {
          response.send(`Server at ${port}`)
        },
        post: (request, response, next) => {
          response.send(`Server at ${port}`)
        },
        put: (request, response, next) => {
          response.send(`Server at ${port}`)
        },
        delete: (request, response, next) => {
          response.send(`Server at ${port}`)
        },
        connect: (request, response, next) => {
          response.send(`Server at ${port}`)
        },
        options: (request, response, next) => {
          response.send(`Server at ${port}`)
        },
        trace: (request, response, next) => {
          response.send(`Server at ${port}`)
        },
        patch: (request, response, next) => {
          response.send(`Server at ${port}`)
        }
      }
    }
  }

  static listen() {
    this.express = express();
    this.express.disable('x-powered-by');
    for (let route in this.routes) {
      if (this.routes[route].static) {
        console.info(`${ this.is } route ${ route } static ${ this.routes[route].static }`);
        this.express.use(route, express.static(this.routes[route].static));
      }
      if (this.routes[route].get) {
        console.info(`${ this.is } route ${ route } method get`);
        this.express.use(route, express.Router().get('', this.routes[route].get));
      }
      if (this.routes[route].head) {
        console.info(`${ this.is } route ${ route } method head`);
        this.express.use(route, express.Router().head('/', this.routes[route].head));
      }
      if (this.routes[route].post) {
        console.info(`${ this.is } route ${ route } method post`);
        this.express.use(route, express.Router().post('/', this.routes[route].post));
      }
      if (this.routes[route].put) {
        console.info(`${ this.is } route ${ route } method put`);
        this.express.use(route, express.Router().put('/', this.routes[route].put));
      }
      if (this.routes[route].delete) {
        console.info(`${ this.is } route ${ route } method delete`);
        this.express.use(route, express.Router().delete('/', this.routes[route].delete));
      }
      if (this.routes[route].connect) {
        console.info(`${ this.is } route ${ route } method connect`);
        this.express.use(route, express.Router().connect('/', this.routes[route].connect));
      }
      if (this.routes[route].options) {
        console.info(`${ this.is } route ${ route } method options`);
        this.express.use(route, express.Router().options('/', this.routes[route].options));
      }
      if (this.routes[route].trace) {
        console.info(`${ this.is } route ${ route } method trace`);
        this.express.use(route, express.Router().trace('/', this.routes[route].trace));
      }
      if (this.routes[route].patch) {
        console.info(`${ this.is } route ${ route } method patch`);
        this.express.use(route, express.Router().patch('/', this.routes[route].patch));
      }
    }
    this.express.set('port', this.port);
    this.server = http.createServer(this.express);
    this.server.listen(this.port);
    this.server.on('error', (e) => this.onError(e));
    this.server.on('listening', () => this.onListening());
  }

  static onError(e) {
    throw e;
  }

  static onListening() {
    let address = this.server.address();
    let bind = typeof address === 'string' ? `pipe ${ address }` : `port ${ address.port }`;
    console.info(`${ this.is } listening on ${ bind }`);
  }
}
