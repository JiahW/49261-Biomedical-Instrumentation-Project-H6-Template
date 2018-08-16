/**
 * Project H6 Backend Template
 *
 * @author Xu Lian (xu.lian@uts.edu.au)
 */
import path from 'path';
import Backend from './src/backend';

Backend.workingDirectory = path.resolve();
Backend.start();
