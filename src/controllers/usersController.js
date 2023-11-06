const express = require('express');
const { Router } = require('express');
const passport = require('passport');
const UserModel = require('../dao/models/userModel');
const mongoose = requiere ('mongoose');
const { generateToken } = require('../util/jwt');
const { createHash, isValidPassword } = require('../util/passwordHash');
const UsersService = require('../services/usersService');
const usersService = new UsersService();




class UsersController {


  async register(req, res) {

    try {
      const { name, lastname, email, password } = req.body;
      if (!name || !lastname || !email || !password) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
      }

      const user = await UserModel.findOne({ email });

      if (user) {
        return res.status(401).json({ error: 'El usuario ya existe' });
      }

      const hashedPassword = createHash(password);

      const newUser = {
        name,
        lastname,
        email,
        password: hashedPassword,
        username: email,
        isAdmin: req.body.isAdmin || false,
      };

      await UserModel.create(newUser);

      return res.redirect('/login');
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  }

  async failRegister(req, res) {
    return res.json({ error: 'Error al registrarse' });
  }

  async failLogin(req, res) {
    return res.json({ error: 'Error al iniciar sesión' });
  }

  async login(req, res) {
    passport.authenticate('login', { failureRedirect: '/faillogin' })(req, res);
  }

  async recoveryPassword(req, res) {
    try {
      let user = await UserModel.findOne({ email: req.body.email });

      if (!user) {
        return res.status(401).json({
          error: 'El usuario no existe en el sistema'
        });
      }

      const newPassword = createHash(req.body.password);
      await UserModel.updateOne({ email: user.email }, { password: newPassword });

      return res.redirect('/login');
    } catch (error) {
      console.error('Error al recuperar contraseña:', error);
      return res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
}

module.exports = new UsersController();







