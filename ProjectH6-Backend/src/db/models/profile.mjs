/**
 * Project H6 Backend Template
 *
 * @author Xu Lian (xu.lian@uts.edu.au)
 */
import DatabaseConnection from '../connection';

export default DatabaseConnection.model('Profile', {
  user: {
    type: DatabaseConnection.Types.Mixed,
    default: {
      _id: null
    }
  },
  firstname: {
    type: DatabaseConnection.Types.String
  },
  lastname: {
    type: DatabaseConnection.Types.String
  },
  gender: {
    type: DatabaseConnection.Types.String
  },
  birthday: {
    type: DatabaseConnection.Types.Date
  },
  email_address: {
    type: DatabaseConnection.Types.String
  },
  telephone_number: {
    type: DatabaseConnection.Types.String
  },
  created: {
    type: DatabaseConnection.Types.Date,
    default: DatabaseConnection.Types.Date.now
  },
  updated: {
    type: DatabaseConnection.Types.Date,
    default: DatabaseConnection.Types.Date.now
  }
});
