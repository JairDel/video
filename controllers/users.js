const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');


async function create(req, res, next){
    const {name, lastName, email, password} = req.body;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const user = new User({name, lastName, email, password: passwordHash, salt});

    //nos permie guardar directamente en la base de datos
    user.save().then(obj => res.status(200).json({
        msg: "Usuario creado correctamente",
        obj: obj,
    })).catch(ex => res.status(500).json({
        msg: "No se pudo almacenar el usuario",
        obj: ex,
    }));

}

function list(req, res, next) {
    User.find().then(obj => res.status(200).json({
        msg: "LIsta de usuarios del sistema",
        obj: obj,
    })).catch(ex => res.status(500).json({
        msg: "No se pudo mostrar la lista",
        obj: ex,
    }));
}

// parametros header = req.params.{name}
// parametros body = req.body.{name}
function index(req, res, next){
    const id = req.params.id;
    User.findOne({"_id":id}).then(obj => res.status(200).json({
        msg: `Usuario del sistema con id ${id}`,
        obj: obj,
    })).catch(ex => res.status(500).json({
        msg: `No se pudo mostrar el usuario con id ${id}`,
        obj: ex,
    }));
}

function replace(req, res, next){
    const id = req.params.id;    let name = req.body.name ? req.body.name : "";
    let lastName = req.body.lastName ? req.body.lastName : "";
    let email = req.body.email ? req.body.email : "";
    let password = req.body.password ? req.body.password : "";    let user = new Object({
        _name : name,
        _lastName : lastName,
        _email: email,
        _password: password
    });    User.findOneAndUpdate({"_id": id}, user, {new:true}).then(obj => res.status(200).json({
        msg : `Se reemplazó el Usuario del sistema con id ${id}`,
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: `No se pudo reemplazar el usuario del sistema con id ${id}`,
        obj: ex
    }));
}

function update(req, res, next){
    const id = req.params.id;    let name = req.body.name;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let password = req.body.password;    let user = new Object();
    if (name) user._name = name;
    if (lastName) user._lastName = lastName;
    if (email) user._email = email;
    if (password) user._password = password;    User.findOneAndUpdate({"_id": id}, user).then(obj => res.status(200).json({
        msg : `Se actualizó el Usuario del sistema con id ${id}`,
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: `No se pudo actualizar el usuario del sistema con id ${id}`,
        obj: ex
    }));
}

function destroy(req, res, next){
    const id = req.params.id;
    User.findByIdAndDelete({"_id":id}).then(obj => res.status(200).json({
        msg : `Se eliminó el Usuario del sistema con id ${id}`,
        obj: obj
    })).catch(ex => res.status(500).json({
        msg: `No se pudo eliminar el usuario del sistema con id ${id}`,
        obj: ex
    }));
}

module.exports = { create, list, index, replace, update, destroy};
