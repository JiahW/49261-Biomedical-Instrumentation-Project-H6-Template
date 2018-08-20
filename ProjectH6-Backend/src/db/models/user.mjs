/**
 * Project H6 Backend Template
 *
 * @author Xu Lian (xu.lian@uts.edu.au)
 */
import DatabaseConnection from '../connection';

export default DatabaseConnection.model('User', {
  username: {
    type: DatabaseConnection.Types.String,
    unique: true
  },
  password: {
    type: DatabaseConnection.Types.String
  },
  recovery_token: {
    type: DatabaseConnection.Types.String,
    default: null
  },
  profile: {
    type: DatabaseConnection.Types.Mixed,
    default: {
      _id: null
    }
  },
  created: {
    type: DatabaseConnection.Types.Date,
    default: DatabaseConnection.Types.Date.now
  },
  updated: {
    type: DatabaseConnection.Types.Date,
    default: DatabaseConnection.Types.Date.now
  }
})
