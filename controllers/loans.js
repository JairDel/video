const express = require('express');

const { Genre } = require('../db');

function create(req, res, next){
    res.send('loans  create');
}

function list(req, res, next) {
    Genre.findAll()
    .then(objects => res.json(objects))
    .catch();
}

function index(req, res, next){
    res.send(`loans => index => ${req.params.id}`);
}

function replace(req, res, next){
    res.send(`loans => replace => ${req.params.id}`);
}

function update(req, res, next){
    res.send(`loans => update => ${req.params.id}`);
}

function destroy(req, res, next){
    res.send(`loans => destroy => ${req.params.id}`);
}

module.exports = { create, list, index, replace, update, destroy};
