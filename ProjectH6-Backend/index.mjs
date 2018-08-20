/**
 * Project H6 Backend Template
 *
 * @author Xu Lian (xu.lian@uts.edu.au)
 */
import path from 'path';
import Backend from './src/backend';
import config from './config.json';

Backend.config = config;
Backend.workingDirectory = path.resolve();
Backend.start();
