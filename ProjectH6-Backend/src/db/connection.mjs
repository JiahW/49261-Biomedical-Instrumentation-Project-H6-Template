/**
 * Project H6 Backend Template
 *
 * @author Xu Lian (xu.lian@uts.edu.au)
 */
import mongoose from 'mongoose';

export default class DatabaseConnection {
  static get Types() {
    return {
      ObjectId: mongoose.Schema.Types.ObjectId,
      String: String,
      Number: Number,
      Date: Date,
      Buffer: Buffer,
      Boolean: Boolean,
      Mixed: mongoose.Schema.Types.Mixed,
      Array: Array,
      Decimal128: mongoose.Schema.Types.Decimal128,
      Map: Map
    }    
  }

  static connect(uri) {
    console.info(`use database ${uri}`);
    mongoose.connect(uri);
    mongoose.connection.on('error', console.error.bind(console, 'database connection error'));
    mongoose.connection.on('open', () => {
      console.info(`database ${uri} connected`);
    });
  }

  static model(name, schema) {
    return mongoose.model(name, mongoose.Schema(schema));
  }
}
