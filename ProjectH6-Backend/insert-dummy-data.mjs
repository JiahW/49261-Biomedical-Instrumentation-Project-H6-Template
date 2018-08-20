/**
 * Project H6 Backend Template
 *
 * @author Xu Lian (xu.lian@uts.edu.au)
 */
import config from './config.json';
import DatabaseConnection from './src/db/connection';
import { securePassword } from './src/core/cryptography';
import User from './src/db/models/user';
import Profile from './src/db/models/profile';
import Sample from './src/db/models/sample';
import Report from './src/db/models/report';

let count = 0;

let { database } = config;
DatabaseConnection.connect(`mongodb://${ database.hostname }:${ database.port }/${ database.database }`);

let u = new User({
  username: 'test',
  password: securePassword('test')
});

u.save((error, u) => {
  if (error) {
    return console.error(error);
  }

  let p = new Profile({
    user: {
      _id: u._id
    },
    firstname: 'Joe',
    lastname: 'Doe',
    gender: 'male',
    birthday: '1970-01-01',
    email_address: 'someone@example.com',
    telephone_number: '00 123456789'
  });

  p.save((error, p) => {
    if (error) {
      return console.error(error);
    }

    u.profile = { _id: p._id };
    u.save();

    for (let i = 0; i < 100; ++i) {
      let sa = new Sample({
        user: {
          _id: u._id
        },
        profile: {
          _id: p._id
        },
        agent: 'biomedical-device'
      });

      sa.save((error, p) => {
        if (error) {
          return console.error(error);
        }

        let r = new Report({
          user: sa.user,
          profile: sa.profile,
          samples: [{
            _id: sa._id
          }]
        });
        r.save((error, p) => {
          if (error) {
            return console.error(error);
          }
          if (++count == 100) return process.exit(0);
        });
      });
    }
  });
});
