const fs = require('fs');
const path = require('path');

const dataFolderPath = path.join(__dirname, '../data');

class UsersMemory {
    constructor () {
      this.users = this.loadUsers();  // Al inicializar, carga los usuarios desde el archivo
    }

    loadUsers() {
      const usersFilePath = path.join(dataFolderPath, 'users.json');  // Ruta al archivo 'users.json'

      try {
        const usersData = fs.readFileSync(usersFilePath, 'utf8');  // Lee el archivo y obtiene su contenido como texto
        return JSON.parse(usersData);  // Parsea el texto a un objeto JavaScript
      } catch (error) {
        // Si hay un error al leer el archivo o parsearlo, se retorna un arreglo vacío
        return [];
      }
    }

    saveUsers() {
      const usersFilePath = path.join(dataFolderPath, 'users.json');  // Ruta al archivo 'users.json'

      try {
        fs.writeFileSync(usersFilePath, JSON.stringify(this.users, null, 2), 'utf8');  // Escribe el objeto de usuarios en el archivo
      } catch (error) {
        throw new Error('Error al guardar los usuarios en el archivo.');  // Maneja errores al guardar
      }
    }

    getAll () {
      return this.users
    }

    get (id) {
      const user = this.users.find(user => user.id === Number(id))
  
      return user
    }

    create (user) {
      user.id = this.users.length + 1
      this.users.push(user)
      this.saveUsers();
      return user
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

module.exports = UsersMemory;
