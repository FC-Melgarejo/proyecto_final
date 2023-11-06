const UserStorage = require('../storage/userStorage');
const { generateToken } = require('../util/jwt');
const { createHash, isValidPassword } = require('../util/passwordHash');


class UsersService {
  /**
   * Constructor de UsersService.
   * Inicializa el servicio creando una instancia de UserStorage.
   */
  constructor () {
    this.storage = new UserStorage();
  }

  /**
   * Retorna todos los usuarios almacenados.
   * @returns {Array} Lista de usuarios.
   */
  getAll () {
    return this.storage.getAll();
  }

  /**
   * Retorna un usuario específico basado en su ID.
   * @param {string} id - ID del usuario.
   * @returns {Object|null} Usuario encontrado o null si no se encuentra.
   */
  get(id) {
    return this.storage.get(id);
  }

  /**
   * Crea un nuevo usuario en el almacenamiento.
   * @param {Object} body - Datos del usuario.
   * @returns {Object} Usuario creado.
   * @throws {Error} Si hay un error al crear el usuario.
   */
  create(body) {
    try {
      const { name, lastname, email, password } = body;

      if (!name || !lastname || !email || !password) {
        throw new Error('Todos los campos son obligatorios');
      }

      body.password = createHash(password);

      return this.storage.create(body);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Actualiza un usuario existente.
   * @param {string} id - ID del usuario.
   * @param {Object} body - Datos a actualizar.
   * @returns {Object|null} Usuario actualizado o null si no se encuentra.
   */
  update(id, body) {
    return this.storage.update(id, body);
  }

  /**
   * Elimina un usuario.
   * @param {string} id - ID del usuario.
   * @returns {Object|null} Usuario eliminado o null si no se encuentra.
   */
  delete(id) {
    return this.storage.delete(id);
  }

  /**
   * Autentica a un usuario.
   * @param {string} mail - Correo electrónico del usuario.
   * @param {string} password - Contraseña del usuario.
   * @returns {Object} Objeto del usuario autenticado (sin contraseña) y token JWT.
   * @throws {Error} Si las credenciales son inválidas.
   */
  login(mail, password) {
    try {
      const user = this.storage.getByMail(mail);

      if (!user || !isValidPassword(password, user.password)) {
        throw new Error('Credenciales inválidas');
      }

      const token = generateToken({
        userId: user.id,
        role: user.role
      });

      delete user.password;

      return {
        user: user,
        token: token
      };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UsersService;
