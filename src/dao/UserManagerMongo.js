const mongoose = require('mongoose');
const UserModel = require('../dao/models/userModel');
const bcrypt = require('bcrypt');
const { createHash } = require('../util/passwordHash');


class UserManager {
    constructor(io) {
        this.model = UserModel;
        this.io = io;
    }

    async create(data) {
        try {
            const { name, lastname, email, password, isAdmin } = data;

            if (!name || !lastname || !email || !password) {
                throw new Error('Todos los campos son obligatorios');
            }

            const hashedPassword = await createHash(password);
            const exist = await this.model.findOne({ email });

            if (exist) {
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
            throw error;
        }
    }

    async authenticateUser(email, password) {
        try {
            const user = await this.model.findOne({ email });

            if (!user) {
                throw new Error(`El usuario con el email "${email}" no existe`);
            }

            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                throw new Error('Los datos ingresados no son correctos');
            }

            const authenticatedUser = { ...user.toObject(), password: undefined };

            return authenticatedUser;
        } catch (error) {
            throw error;
        }
    }

    async isAdmin(email) {
        try {
            const user = await this.model.findOne({ email });

            if (!user) {
                throw new Error(`El usuario con el email "${email}" no existe`);
            }

            return user.isAdmin || false;
        } catch (error) {
            throw error;
        }
    }

    newUser() {
        this.io.emit('newuser');
    }
}

module.exports = UserManager;





