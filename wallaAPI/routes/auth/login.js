"use strict";

const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const jwtAuth = require("../../lib/jwtAuth");

const User = require("../../models/User");

// autenticamos por email y pass y devolvemos token si es correcto
router.post("/", async (req, res, next) => {
  try {
    const email = req.body.email;
    const pass = req.body.pass;

    
    // hacemos un hash de la password
    const hashedPassword = User.hashPassword(pass);

    const user = await User.findOne({ email: email, pass: hashedPassword });

    if (!user) {
      // Respondemos que no son validas las credenciales
      res.json({
        success: true,
        regsNumber: 0,
        result: "Invalid credentials"
      });
      return;
    }

    // el User está y coincide la password
    // creamos el token
    jwt.sign(
      { _id: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d"
      },
      (err, token) => {
        if (err) {
          console.log(err)
          return next(err);
        }
        // respondemos con un JWT
        res.json({
          success: true,
          regsNumber: 1,
          result: token
        });
      }
    );
  } catch (err) {
    next(err);
  }
});

module.exports = router;
