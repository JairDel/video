const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const user = require('../models/user');


function home(req, res, next) {
    res.render('index', { title: 'Express' });
}

function login(req, res, next){
    const { email, password } = req.body;
    const jwtKey = "b76a26fb781e4177f17ef433c9330d8b";

    User.findOne({"_email": email}).then(async(user) => {
        if(user){
            bcrypt.hash(password, user.salt, (err, hash)=>{
                if(err){
                    res.status(403).json({
                        msh: "Usuario y/0 contraseña incorrecto",
                        obj: null
                    });
                }
                if(hash === user.password){
                    res.status(200).json({
                        msg: "Sesión iniciada correctamente",
                        obj: jwt.sign({data:user._id, exp: Math.floor(Date.now()/1000)+180}, jwtKey)
                    });
                }else{
                    res.status(403).json({
                        msh: "Usuario y/0 contraseña incorrecto",
                        obj: null
                    });
                }
            });
        }else{
            res.status(403).json({
                msh: "Usuario y/0 contraseña incorrecto",
                obj: null
            });
        }
    }).catch(ex => res.status(403).json({
        msh: "Usuario y/0 contraseña incorrecto",
        obj: null
    }));
}

module.exports = {home, login}