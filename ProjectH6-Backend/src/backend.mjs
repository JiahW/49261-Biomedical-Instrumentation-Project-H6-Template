/**
 * Project H6 Backend Template
 *
 * @author Xu Lian (xu.lian@uts.edu.au)
 */
import APIServer from './servers/apiserver';
import ClientServer from './servers/clientserver';

export default class Backend {
  static start() {
    console.info('start backend');
    ClientServer.publicDirectory = `${ this.workingDirectory }/public`;
    ClientServer.listen();
    APIServer.listen();
  }
}
