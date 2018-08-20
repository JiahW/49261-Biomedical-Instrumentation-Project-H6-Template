/**
 * Project H6 Backend Template
 *
 * @author Xu Lian (xu.lian@uts.edu.au)
 */
import DatabaseConnection from '../connection';

export default DatabaseConnection.model('Report', {
  user: {
    type: DatabaseConnection.Types.Mixed,
    default: {
      _id: null
    }
  },
  profile: {
    type: DatabaseConnection.Types.Mixed,
    default: {
      _id: null
    }
  },
  samples: {
    type: DatabaseConnection.Types.Mixed,
    default: []
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
