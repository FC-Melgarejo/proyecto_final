const mongoose = require('mongoose');

class MongoSingleton {
  static instance;

  static async connect(settings) {
    if (!this.instance) {
      try {
        const MONGODB_CONNECT = this.buildConnectionString(settings);

        await mongoose.connect(MONGODB_CONNECT, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });

        console.log(`Conectado a la base de datos ${settings.db_name}`);
        this.instance = true;
      } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
      }
    } else {
      console.log('Ya existe una conexión a la base de datos');
    }
  }

  static getConnection(settings) {
    return this.connect(settings).then(() => this.instance);
  }

  static buildConnectionString(settings) {
    return `mongodb+srv://${settings.db_user}:${settings.db_password}@${settings.db_host}/${settings.db_name}?retryWrites=true&w=majority`;
  }
}

module.exports = MongoSingleton;

