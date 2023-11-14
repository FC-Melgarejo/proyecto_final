const fs = require('fs');
const path = require('path');

const dataFolderPath = path.join(__dirname, '../data');

class UserDAO {
    constructor () {
      this.users = this.loadUsers();  
    }

    loadUsers() {
      const usersFilePath = path.join(dataFolderPath, 'users.json');  

      try {
        const usersData = fs.readFileSync(usersFilePath, 'utf8');  
        return JSON.parse(usersData);  
      } catch (error) {
        return [];
      }
    }

    saveUsers() {
      const usersFilePath = path.join(dataFolderPath, 'users.json');  

      try {
        fs.writeFileSync(usersFilePath, JSON.stringify(this.users, null, 2), 'utf8');  
      } catch (error) {
        throw new Error('Error al guardar los usuarios en el archivo.');  
      }
    }

    getAll () {
      return this.users
    }

    get (id) {
      const user = this.users.find(user => user.id === Number(id))
  
      return user
    }

    async register(data) {
      try {
          const { name, lastname, email, password, isAdmin } = data;
  
          if (!name || !lastname || !email || !password) {
              throw new Error('Todos los campos son obligatorios');
          }
  
          const hashedPassword = await createHash(password);
          const exist = await this.model.findOne({ email });
  
          if (exist) {
              // Aquí puedes manejar específicamente el error de correo electrónico duplicado
              throw new Error(`Ya existe un usuario con el email ${email}`);
          }
  
          await this.model.create({
              name,
              lastname,
              email,
              password: hashedPassword,
              isAdmin: isAdmin || false,
          });
  
          this.newUser();
  
      } catch (error) {
          // Aquí puedes manejar otros tipos de errores o simplemente rethrow el error
          throw error;
      }
  }
  
    

    update (id, body) {
      let userIndex = this.users.findIndex(user => user.id === Number(id))

      if (userIndex === -1) {
        return null;
      }

      this.users[userIndex] = { ...this.users[userIndex], ...body };
      this.saveUsers();
      return this.users[userIndex];
    }

    delete (id) {
      let userIndex = this.users.findIndex(user => user.id === Number(id))

      if (userIndex === -1) {
        return false
      }

      this.users.splice(userIndex, 1)
      this.saveUsers();
      return true
    }

    getByMail (mail) {
      const user = this.users.find(user => user.mail === mail)
      return user
    }
}

module.exports = UserDAO;
