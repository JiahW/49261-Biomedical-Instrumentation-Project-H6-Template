/**
 * Project H6 Backend Template
 *
 * @author Xu Lian (xu.lian@uts.edu.au)
 */
import DatabaseConnection from './db/connection';
import APIServer from './servers/apiserver';
import ClientServer from './servers/clientserver';

export default class Backend {
  static start() {
    let { database } = Backend.config;

    DatabaseConnection.connect(`mongodb://${ database.hostname }:${ database.port }/${ database.database }`);

    console.info('start backend');
    ClientServer.publicDirectory = `${ this.workingDirectory }/public`;
    ClientServer.listen();
    APIServer.listen();
  }
}
